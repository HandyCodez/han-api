const main = async ()=> {

    function x() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('done!');
            }, 10000);
        });
    }
    
    await x().then((done) => {
        console.log(done); // --> 'done!'
    });
    
    console.log('uy')
}
main()
