const linspace = (start, stop, n) => {
    const step = (stop-start)/n;
    const result = new Array(n);
    let j = 0;
    for(let i=start;i<stop;i+=step) result[j++] = i;
    return result;
};  

export default linspace;
