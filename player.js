export default function Player() {
    let sign;
    let isSelected = false;
    return {
        isSelected,
        setSign(newSign) {
            sign = newSign;
        },
        getSign() {
            return sign;
        }
    }
}