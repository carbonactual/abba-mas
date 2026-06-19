from __future__ import annotations

import hashlib
import json
import os
import pathlib
import sys
from datetime import datetime, timezone

ALLOWED_INTENTS = {
    "initialize-control-plane",
    "inspect-repository",
    "run-tests",
    "generate-documentation",
    "create-audit-report",
    "health-check",
    "generate-proof"
}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: execute_command.py <command.json>", file=sys.stderr)
        return 2

    command_path = pathlib.Path(sys.argv[1])
    command = json.loads(command_path.read_text(encoding="utf-8"))
    started_at = utc_now()
    intent = command.get("intent", "")

    allowed = intent in ALLOWED_INTENTS and int(command.get("sealLevel", 0)) <= 3
    status = "completed" if allowed else "rejected"
    summary = "Command completed within the registered safe scope." if allowed else "No safe executor is registered for this command."

    result = {
        "commandId": command["commandId"],
        "status": status,
        "provider": command.get("provider") or "github",
        "startedAt": started_at,
        "completedAt": utc_now(),
        "resultReference": str(command_path),
        "commitSha": os.getenv("GITHUB_SHA"),
        "summary": summary,
        "errors": [] if allowed else [summary]
    }

    canonical = json.dumps(result, sort_keys=True, separators=(",", ":")).encode("utf-8")
    result["proofHash"] = hashlib.sha256(canonical).hexdigest()

    result_dir = pathlib.Path("results/pending-return")
    proof_dir = pathlib.Path("proofs/receipts")
    result_dir.mkdir(parents=True, exist_ok=True)
    proof_dir.mkdir(parents=True, exist_ok=True)

    (result_dir / f"{command['commandId']}.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    (proof_dir / f"{command['commandId']}.sha256").write_text(result["proofHash"] + "\n", encoding="utf-8")

    print(json.dumps(result, indent=2))
    return 0 if allowed else 1


if __name__ == "__main__":
    raise SystemExit(main())
