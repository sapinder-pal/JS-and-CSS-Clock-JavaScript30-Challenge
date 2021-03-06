document.addEventListener("DOMContentLoaded", () => {
	const sixtyStepArc = 360 / 60;
	const twelveStepArc = 360 / 12;

	const date = new Date();
	
	// [length of arc] * [no. of arcs or steps]
	let secondsHandPos = sixtyStepArc * date.getSeconds();
	let minutesHandPos = sixtyStepArc * date.getMinutes();
	let hoursHandPos = twelveStepArc * format24HoursTo12(date);

	const [hoursHand, minutesHand, secondsHand] = document.getElementsByClassName("hand");

	// set hands according to current time
	setHand(secondsHand, secondsHandPos);
	setHand(minutesHand, minutesHandPos);
	setHand(hoursHand, hoursHandPos);

	// just animate the secondsHand unlike other hands
	secondsHand.animate([
		{ transform: `rotateZ(${secondsHandPos + 360}deg)`}
	], {
		// 60 seconds
		duration: 1000 * 60,
		iterations: Infinity,
		fill: "forwards"	
	});

	// we can move minutesHand and hoursHand each second, so the animation doesn't really matter
	setInterval(() => {
		minutesHandPos += sixtyStepArc / 60;
		hoursHandPos += twelveStepArc / (60 * 60);

		setHand(minutesHand, minutesHandPos);
		setHand(hoursHand, hoursHandPos);
	}, 1000);
})


function format24HoursTo12(date) {
	const current = date.getHours();

	// reset hours to 0
	return current < 12 ? 
			current : (current - 12);
}

function setHand(hand, position) {
	hand.style.transform = `rotateZ(${position}deg)`;
}