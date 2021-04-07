window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")

    setTimeout(transitionLoop, 5000)
    // transitionLoop()

})


// let body = document.querySelector('body')
let unScrolled = document.querySelector('.un-scrolled')
let header = document.querySelector('header')

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
        color: '#6a4ca6'
    },
    {
        animationName: 'violet-green',
        frameOut: frame3,
        frameIn: frame4,
        color: '#5bb84d'

    },
    {
        animationName: 'green-blue',
        frameOut: frame4,
        frameIn: frame1,
        color: '#0060bf'
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
    unScrolled.style.animationName = currTransition.animationName
    header.style.animationName = currTransition.animationName

    currTransition.frameOut.style.animationName = 'out-of-frame';
    currTransition.frameIn.style.animationName = 'in-to-frame';



    // then transiton to next state, taking 500seconds
    // await timer(500) // this pause code during transiion
    unScrolled.style.backgroundColor = currTransition.color
    header.style.backgroundColor = currTransition.color


    currTransition.frameOut.style.left = '-250%'
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
