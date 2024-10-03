const splice = (array, start, deleteCount) => {
    const result = [];

    const laps = deleteCount ?? array.length - start;

    for (let i =  0; i< laps; i++) {
        result[result.length] = array[i + start];
    }
    if (deleteCount !== undefined) {
        for (let i= 0; i< deleteCount; i++) {
            array[start + i] = array[array.length - deleteCount + i];
        }
    }

    array.length = deleteCount == undefined ? start : array.length - deleteCount;

    return result;
};

//refactored solution for array method, not for objects.