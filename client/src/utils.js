export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const convertTimestamp = (seconds) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(seconds * 1000); // convert to milliseconds
    const month = monthNames[d.getMonth()];
    const day = d.getDate();
    return `${month} ${day}`;
}