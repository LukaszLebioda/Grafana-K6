let a = 12;
const txt = "Kasia";

if (true) {
	let a = 100;
	const txt = "Zosia";

	console.log("local: ", a, txt);
}

console.log("global: ", a, txt);

for (let i = 0; i < 3; i++) {
	let a = 56;
	console.log("for", i, a);
}
