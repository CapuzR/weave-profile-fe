import { weaveProfileFe } from "../../declarations/weaveProfileFe";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with weaveProfileFe actor, calling the greet method
  const greeting = await weaveProfileFe.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
