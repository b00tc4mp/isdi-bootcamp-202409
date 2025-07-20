import isMatch from './isMatch'

export default (a, b) => {
    if (!a && !b) return true; // Both don't have a devil fruit
    if (a && b) return isMatch(a.type, b.type); // Compare types
    return false; // One has it, the other doesn't
};