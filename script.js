// smooth website

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



// first page animation 

function firstPage(){ 

    console.log("working")
    var tl= gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelm", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })

    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

// small circle mouse follower

function circleMouseFollower(xscale, yscale)
{
    window.addEventListener("mousemove", function(details){
        // console.log(details.clientX, details.clientY);
        document.querySelector('.minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;

    })
}

let timeout;

// shape changing of small circle on mouse movement

function circleblunt(){
    let xscale = 1;
    let yscale = 1;

    let xprev= 0;
    let yprev= 0;

    window.addEventListener("mousemove", function(details){
        this.clearTimeout(timeout)
        const xdiff =details.clientX - xprev;
        const ydiff =details.clientY - yprev;

        
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);
        
        xprev = details.clientX;
        yprev = details.clientY;

        circleMouseFollower(xscale, yscale)

        timeout = setTimeout(function(){
            document.querySelector('.minicircle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`;
        }, 100)

    })
}

circleMouseFollower()
firstPage()
circleblunt()


// image movement according to scroll

// selecting images and displaying

document.querySelectorAll(".elem").forEach(function(elem)
{

    let rotate = 0;
    let diffrot = 0;

    //on mouse move what would happen

    elem.addEventListener("mousemove", function(details){ //for mouse x axis and y axis details
    // var diff = details.clientY - elem.getBoundingClientRect().top;

    diffrot = details.clientX - rotate;
    rotate = details.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            // top: diff,
            left: details.clientX,
            rotate:  gsap.utils.clamp(-20, 20, diffrot*0.5),
        });
    });

    elem.addEventListener("mouseleave", function(){ //for mouse x axis and y axis details


        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power2,
            duration: 0.5,
        });
    });
}); 



// changing images 

document.addEventListener("DOMContentLoaded", function () {
    const elemImages = {
        furniture: [
            "https://i.pinimg.com/564x/3d/b8/72/3db872abb4d60da1716951d213c95de8.jpg",
            "https://i.pinimg.com/564x/6c/59/df/6c59df5f0c09a2fa5585dc93750aa2e0.jpg",
            "https://i.pinimg.com/564x/51/41/cc/5141cced7fb3515cdbc22fb3e03ed916.jpg",
            "https://i.pinimg.com/564x/0d/b3/f4/0db3f47f9667f4bf32c1f6765a085ed3.jpg",
            "https://i.pinimg.com/564x/ee/71/2c/ee712c9f32df79a43c391334ad97eb75.jpg",
            "https://i.pinimg.com/564x/49/9d/3f/499d3f64808d60e7af953eeac6c4bd13.jpg",
            "https://i.pinimg.com/564x/28/1a/79/281a79fecb1fe2307e5bff6f9856ab03.jpg",
            "https://i.pinimg.com/564x/0e/e7/d5/0ee7d5f3ecfc69629fde3547809331a1.jpg",
            "https://i.pinimg.com/564x/cf/4f/cf/cf4fcf69db09d65d674a694dfab84026.jpg",
            "https://i.pinimg.com/564x/d6/d7/b7/d6d7b708021325e6fe1dbf912cd2cba6.jpg"
        ],
        billboards: [
            "image4.jpg",
            "image5.jpg",
            "image6.jpg"
        ],
        siteworks: [
            "image7.jpg",
            "image8.jpg",
            "image9.jpg"
        ]
    };
    

    document.querySelectorAll(".elem").forEach(function(elem) {
        let imageIndex = 0;
        let image = elem.querySelector("img");
    
        // Function to change the image on hover
        elem.addEventListener("mouseover", function() {
            // Set opacity to 0 for smooth fading effect
            image.style.opacity = 0;
            image.src = elemImages[elem.id][imageIndex];
            image.style.opacity = 1;
            // Increment image index for the next change
            imageIndex = (imageIndex + 1) % elemImages[elem.id].length;
        });    
        setInterval(changeImage, 2000);
        // Hide image when not hovering
        elem.addEventListener("mouseleave", function() {
            // Set opacity to 0 for smooth fading out effect
            image.style.opacity = 0;
        });
    });

});









