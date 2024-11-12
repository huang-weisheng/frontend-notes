class EventBus {
	constructor(onName='$on',emeitName='$emit') {
		let eventList={};
		this[onName]=(eventName,fn) => {
			if(eventList[eventName]) {
				eventList[eventName].push(fn);
			} else {
				eventList[eventName]=[];
				eventList[eventName].push(fn);
			}
		};
		this[emeitName]=(eventName,...theArgs) => {
			eventList[eventName]?.forEach(fn => {
				fn(...theArgs);
			});
		};
	}
}
export default new EventBus('$on','$emit');
