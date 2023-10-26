export const checkExists = data => data !== null && data !== undefined;
export const getRandomNum = (min, max) => {
    return Math.random() * (max - min) + min;
}
