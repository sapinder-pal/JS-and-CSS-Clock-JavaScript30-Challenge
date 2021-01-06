document.addEventListener("DOMContentLoaded", () => {
	const secondsArc = 360 / 60;

	const date = new Date();
	
	// [length of arc] * [no. of arcs or steps]
	let secondsHandPos = secondsArc * date.getSeconds();
	let minutesHandPos = secondsArc * date.getMinutes();
	let hoursHandPos = (secondsArc / 12) * format24HoursTo12(date);

	const [hoursHand, minutesHand, secondsHand] = document.getElementsByClassName("hand");

	// set hands according to current time
	setHand(secondsHand, secondsHandPos);
	setHand(minutesHand, minutesHandPos);
	setHand(hoursHand, hoursHandPos);


	secondsHand.animate([
		{ transform: `rotateZ(${secondsHandPos + 360}deg)`}
	], {
		// 60 seconds
		duration: 1000 * 60,
		iterations: Infinity,
		fill: "forwards"	
	});


	setInterval(() => {
		minutesHandPos += secondsArc / 60;
		hoursHandPos += secondsArc / (60 * 60);

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