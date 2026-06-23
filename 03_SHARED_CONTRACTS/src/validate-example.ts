import example from "../examples/minimum-loop.example.json" with { type: "json" };
import { assertContract } from "./validator.js";

assertContract("HashIdentity", example.identity);
assertContract("PersonalAIMint", example.personalAiMint);
assertContract("ActualSession", example.actualSession);
assertContract("BecomingCard", example.becomingCard);
assertContract("PulseEvent", example.pulse);
assertContract("AtlasProjection", example.atlasProjection);

console.log("Shared contract example is valid.");
