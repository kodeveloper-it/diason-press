const menuButton=document.querySelector(".header__button")
const menu=document.querySelector(".header__nav")
const form=document.querySelector(".contact-form");
const callbackName=document.querySelector(".callback-name");
const callbackPhone=document.querySelector(".callback-phone");
const callbackForm=document.querySelector(".modal-callback form");
const callbackNameErrorMessage=document.querySelector('span[data-error="name"]');
const callbackPhoneErrorMessage=document.querySelector('span[data-error="phone"]');
const callbackModalClose=document.querySelector(".modal-callback__close");
const callbackModal=document.querySelector(".modal-callback");
const callbackModalOpen=document.querySelector(".callback");
const achievementAnnimateBloks=document.querySelectorAll(".achievement-annimate");
const achievementsSection=document.querySelector(".achievements");
const imagesProductsButton=document.querySelectorAll(".current-images-bottom-list__item");
const imageProductsMain=document.querySelector(".current-images-block__thumbnail img");




let callbackNameValue="";
let callbackPhoneValue="";


function toggleMenu(){
    menuButton.classList.toggle("active")
    menu.classList.toggle("is-hidden")
    document.body.classList.toggle("locked")
}

function onSubmitForm(event){
event.preventDefault()
const response={
    name:event.target.elements.name.value.trim(),
    phone:event.target.elements.phone.value.trim(),
    email:event.target.elements.email.value.trim(),
    message:event.target.elements.message.value.trim(),
}
alert(response)
}

function onSubmitCallbackForm(event) {
    const requiredFields=callbackNameValue.length && callbackPhoneValue.length
    const MIN_TEL=10;
    const MAX_TEL=20;
    const MIN_NAME=2;
    const MAX_NAME=30;

    event.preventDefault()
    if(!requiredFields){
        callbackNameErrorMessage.textContent="";
        callbackPhoneErrorMessage.textContent="";
        if(!callbackNameValue.length) {
            callbackNameErrorMessage.textContent="Імʼя не може бути порожнім!";
        }
        if(!callbackPhoneValue.length) {
            callbackPhoneErrorMessage.textContent="Телефон не може бути порожнім!";
        }
        return
    }
    const regeks=/^\+?[\d\s\-\(\)]+$/;
    if(!regeks.test(callbackPhoneValue)) {
        callbackNameErrorMessage.textContent="";
        callbackPhoneErrorMessage.textContent="";
        callbackPhoneErrorMessage.textContent="Номер телефону повинен містити тільки цифри";
        return
    }

    const checkLengthValues=callbackNameValue.length<MIN_NAME || callbackNameValue.length>MAX_NAME || callbackPhoneValue.length<MIN_TEL || callbackPhoneValue.length >MAX_TEL;
    if (checkLengthValues) {
        callbackNameErrorMessage.textContent="";
        callbackPhoneErrorMessage.textContent="";
        if(callbackNameValue.length<MIN_NAME){
            callbackNameErrorMessage.textContent=`Довжина імені не може бути менше, ніж ${MIN_NAME}`
        }
        if(callbackNameValue.length>MAX_NAME){
            callbackNameErrorMessage.textContent=`Довжина імені не може бути більше, ніж ${MAX_NAME}`
        }
        if(callbackPhoneValue.length<MIN_TEL){
            callbackPhoneErrorMessage.textContent=`Довжина телефону не може бути менше, ніж ${MIN_TEL}`
        }
        if(callbackPhoneValue.length>MAX_TEL){
            callbackPhoneErrorMessage.textContent=`Довжина телефону не може бути більше, ніж ${MAX_TEL}`
        }
        return
    }

    alert("Дякуємо.Форму відправлено")
    const responseData = {
        name:callbackNameValue,
        phone:callbackPhoneValue,
        text:callbackForm.dataset.callback
    }


    callbackNameValue="";
    callbackPhoneValue="";
    callbackNameErrorMessage.textContent="";
    callbackPhoneErrorMessage.textContent="";
    callbackName.value="";
    callbackPhone.value="";
    callbackModal.classList.add("is-hidden")

}

function handleChangeName(event) {
    callbackNameValue=event.target.value.trim()
}
function handleChangePhone(event) {
    callbackPhoneValue=event.target.value.trim()
}

function handleClickModal(event) {
    if(event.target === callbackModalClose || event.target.parentElement.classList.contains("modal-callback__close")) {
    
        callbackModal.classList.toggle("is-hidden")
    }

    
    if(event.target === callbackModalOpen || event.target.parentElement.classList.contains("callback")) {
        callbackModal.classList.toggle("is-hidden")
    }
}

function handleClickBackDrop(event) {
if (event.target !== event.currentTarget) { 
    return 
}
event.target.classList.toggle("is-hidden")
}

menuButton.addEventListener("click",toggleMenu)
if(form) {form.addEventListener("submit",onSubmitForm)}
if(callbackName) {
    callbackName.addEventListener("input",handleChangeName)
}
if(callbackPhone) {
    callbackPhone.addEventListener("input",handleChangePhone)
}
if(callbackForm) {
    callbackForm.addEventListener("submit",onSubmitCallbackForm)
}

if(callbackModalClose) {
    callbackModalClose.addEventListener("click",handleClickModal)
}
if(callbackModalOpen) {
    callbackModalOpen.addEventListener("click",handleClickModal)
}
if(callbackModal) {
    callbackModal.addEventListener("click",handleClickBackDrop)
}



const annimateCounter = (elementId,start,end,duration)=>{
    let starttime = null;
    function updateCounter(currentTime){
        if(!starttime){
            starttime = currentTime;
        }
        const elepsedTime = currentTime - starttime;
        const progress = Math.min(elepsedTime/duration,1)
        const currentNumber = Math.floor(start+(end-start)*progress)
        elementId.textContent = currentNumber.toLocaleString()
        if (progress < 1) {
            requestAnimationFrame(updateCounter)
        }
    }
    requestAnimationFrame(updateCounter)
}

const observerOptions = {
    threshold:0.5,
    root:null,
    rootMargin:"0px"
}
const observerCallback = (entries)=>{
    entries.forEach((entry)=>{
        console.log(entry.isIntersecting)
        if(entry.isIntersecting){
            achievementAnnimateBloks.forEach(block =>{
                const currentState = Number(block.textContent)
                annimateCounter(block,0,currentState,3000)
                observer.unobserve(achievementsSection)
            })
        }
    })
}
const observer = new IntersectionObserver(observerCallback,observerOptions)
if (achievementsSection){
    observer.observe(achievementsSection)
}


if ([...imagesProductsButton].length){
    imageProductsMain.src = imagesProductsButton[0].children[0].src
    imagesProductsButton.forEach(btn =>{
        console.log(btn.children[0].src)
        btn.addEventListener("click",(event)=>{
            const imgPath = event.currentTarget.children[0].src;
            console.log(imgPath)
            imageProductsMain.src = imgPath;
        })
    })
}

