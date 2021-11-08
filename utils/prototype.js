
/**
 * DATE
 */
Date.prototype.toFormat = function () {
    const data = this;
    const day = data.getDate();
    const month = data.getMonth() + 1;
    const year = data.getFullYear();
    const hour = data.getHours();
    const minute = data.getMinutes();
    const second = data.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}