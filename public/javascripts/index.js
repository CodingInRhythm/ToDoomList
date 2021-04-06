window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")

    setTimeout(transitionLoop, 5000)
    // transitionLoop()

})


let body = document.querySelector('body')

let frame1 = document.querySelector('.frame-1');
let frame2 = document.querySelector('.frame-2');
let frame3 = document.querySelector('.frame-3');
let frame4 = document.querySelector('.frame-4');

const animationNames = [
    {
        animationName: 'blue-lightblue',
        frameOut: frame1,
        frameIn: frame2,
        color: '#3292f2'
    },
    {
        animationName: 'lightblue-violet', 
        frameOut: frame2,
        frameIn: frame3,
        color: 'violet'
    },
    {
        animationName: 'violet-green', 
        frameOut: frame3, 
        frameIn: frame4,
        color: 'green'

    }, 
    {
        animationName: 'green-blue',
        frameOut: frame4, 
        frameIn: frame1,
        color: 'blue'
    }
]

const timer = async (time) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
}

const transitionLoop = () => {
    transition()
}

const transition = async () => {
    console.log('hello')
    // frame1.style.left = '125%'
    let currTransition = animationNames.shift()
    body.style.animationName = currTransition.animationName
    currTransition.frameOut.style.animationName = 'out-of-frame';
    currTransition.frameIn.style.animationName = 'in-to-frame';



    // then transiton to next state, taking 500seconds
    // await timer(500) // this pause code during transiion
    body.style.backgroundColor = currTransition.color
    currTransition.frameOut.style.left = '-200%'
    currTransition.frameIn.style.left = '0%'
    animationNames.push(currTransition)

    
    
    // setTimeout(() => {
        //     let animationName = animationNames.shift()
        //     body.style.animationName = animationName;
        //     animationNames.push(animationName)
        // }, 5000)

    await timer(5000)// waits with new state for 5s, then start over agiain.
    transitionLoop()
}