var cal = function(s) {
    if (s.length === 1) {
        return s;
    }
    s.split('').reduce((acc, curr, idx, array) => {
        if (!Number.isNaN(curr) && (typeof curr === 'number')) {
            acc.push(curr);
            return acc;
        }
        if (curr === '+') {
            return acc + calculate(s.slice(idx)) 
        }
    }, 0);
};