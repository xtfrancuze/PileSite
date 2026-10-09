        let galleryLightbox = null;
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        document.addEventListener('click', (e) => {
            const burgerBtn = e.target.closest('.burger');
            if (burgerBtn) {
                const burgerMenu = document.querySelector('.burger-menu');
                burgerBtn.classList.toggle('open');     
                if (burgerMenu) burgerMenu.classList.toggle('open');
                burgerMenu.addEventListener('click', (e) => {
                    if (e.target.closest('a')) {
                        const burger = document.querySelector('.burger');
                        burgerMenu.classList.remove('open');
                        burger.classList.remove('open');
                    }
                })
            }
        });

        document.querySelectorAll('a[href^="#"], a[href*="/#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                const targetId = href.substring(href.indexOf('#'));
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 50); 
                }
            });
        });

        async function loadPage(url) {
            try {
                let fetchUrl = url;
                if (fetchUrl.endsWith('/')) {
                    fetchUrl += 'index.html';
                }

                const lazyPreload = document.querySelector('.preloader'); 
                
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    const errorResponse = await fetch('/error/error.html');
                    const parseHTML = await errorResponse.text();
                    const parsing = new DOMParser();
                    const loadError = parsing.parseFromString(parseHTML, 'text/html');
                    const errorElement = loadError.getElementById('app');
                    if (errorElement) {
                        const content = errorElement.innerHTML;
                        const app = document.getElementById('app');
                        app.insertAdjacentHTML('afterbegin', content);
                    }
                    return;
                }
                
                const htmlText = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');

                const content = doc.getElementById('app').innerHTML;
                const liveApp = document.getElementById('app');
                liveApp.innerHTML = '';
                if (lazyPreload) {
                    lazyPreload.style.display = 'flex';
                    lazyPreload.style.transition = 'display 0.3s ease';
                }
                liveApp.insertAdjacentHTML('afterbegin', content);
                document.title = doc.title;
                initSlider();
                initClasslistButton();
                initGallery();
                compileAnimations();
                initValidate();
                callculateOrder();
                await delay(2000);
                lazyPreload.style.display = 'none';
                lazyPreload.style.transition = 'display 0.3s ease';
            } catch (err) {
                console.error(err.message);
            }
        }
        
        function initClasslistButton() {
            const navigationLink = document.getElementById('navigationLinkes');
            if (!navigationLink) return;
            const linkes = navigationLink.querySelectorAll('a');
            const path = document.location.pathname;
            linkes.forEach((link) => {
                if (link.pathname === path) {
                    link.classList.add('active_btn');
                } else {
                    link.classList.remove('active_btn');
                }
            })
        };

        async function initGallery() {
            const gallery = document.getElementById('gallery');
            if (!gallery) return;

            if (galleryLightbox) {
                galleryLightbox.destroy();
                galleryLightbox = null;
            }
            try {
            const { default: PhotoSwipeLightbox } = await import('https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe-lightbox.esm.min.js');
            const lightbox = new PhotoSwipeLightbox({
            gallery: '#gallery',
            children: 'a',
            pswpModule: () => import('https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.esm.min.js'),
            showHideAnimationType: 'zoom',
            showAnimationDuration: 300,
            hideAnimationDuration: 300,
            bgOpacity: 0.85, 
            maxSpreadZoom: 4, 
            closeTitle: 'Закрыть окно',
            zoomTitle: 'Увеличить',
            arrowPrevTitle: 'Предыдущий слайд',
            arrowNextTitle: 'Следующий слайд'
            });
            lightbox.init();
        } catch (err) {
            console.error(err.message)
        }
    }

        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link || link.origin !== window.location.origin) return;
            
            if (link.closest('#gallery') || link.closest('.project-gallery')) {
                e.preventDefault();
                return;
            }   
                e.preventDefault();
                const url = link.href;

                const validHashes = ['liteConstruct', 'midConstruct', 'hardConstruct'];
                validHashes.forEach(id => {
                    if (url.includes(id)) {
                        setTimeout(() => {
                        const construct = document.getElementById(id);
                        construct.scrollIntoView({behavior: 'smooth', block: 'center'});
                        const cleanURL = window.location.pathname;
                        window.history.replaceState({}, '', cleanURL);
                        }, 50)
                    }
                })
                window.history.pushState({}, '', url);
                loadPage(url);
        });

        window.addEventListener('popstate', () => {
            loadPage(window.location.href);
        })

function setReward(names, rewards) {
    const colors = [
        "#AA47BD", "#7B1FA2", "#77919D", "#455A65", "#EC417A",
        "#C1175C", "#5D6AC0", "#0388D2", "#00579B", "#0098A7",
        "#00897B", "#004D40", "#68A039", "#34691E", "#8C6E63",
        "#5D4138", "#7D57C1", "#512DA7", "#EF6C00", "#F6511E", "#BE360B"
    ];

    if (String(names).trim() === '' || String(rewards).trim() === '') return;

    const listContainer = document.querySelector('.splide__list');
    if (!listContainer) return;

    const blockReward = document.createElement('li');
    blockReward.classList.add('blockReward', 'splide__slide');
    
    const collect = document.createElement('div');
    collect.classList.add('collect');
    
    const photo = document.createElement('div');
    photo.classList.add('photo');
    
    const name = document.createElement('h3');
    name.classList.add('name');
    name.textContent = String(names);
    
    const reward = document.createElement('p');
    reward.classList.add('reward');

    function randomColor() {
        const randomDigit = Math.floor(Math.random() * colors.length);
        photo.style.backgroundColor = colors[randomDigit];
    }
    randomColor();

    if (String(rewards).length > 50) {
        const more = document.createElement('p');
        more.textContent = "Подробнее";
        more.classList.add('more');
        reward.append(String(rewards).slice(0, 55), more);

        more.addEventListener('click', () => {
            const modal = document.createElement('dialog');
            modal.classList.add('modal');
            document.body.appendChild(modal);

            modal.addEventListener('close', () => {
                modal.remove();
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.close();
            });

            const header = document.createElement('div');
            header.classList.add('modal-header');

            const avatar = document.createElement('div');
            avatar.classList.add('photo');
            avatar.style.backgroundColor = photo.style.backgroundColor;
            avatar.textContent = names.at(0);

            const nameUser = document.createElement('h3');
            nameUser.classList.add('name-modal-reward');
            nameUser.textContent = names;

            header.append(avatar, nameUser);

            const rewardUser = document.createElement('p');
            rewardUser.classList.add('reward-modal');
            rewardUser.textContent = rewards;

            modal.append(header, rewardUser);
            modal.showModal();
        });
    } else {
        reward.textContent = String(rewards);
    }

    const firstLetter = names.split('').at(0);
    photo.textContent = firstLetter;

    collect.append(photo, name);
    blockReward.append(collect, reward);
    listContainer.appendChild(blockReward);
}

function initSlider() {
    const splideElement = document.querySelector('.splide');
    if (splideElement) {
    setReward("Валентин", "Установка жб свай. Парни молодцы. Приехали вовремя за  270км, сами все разметили, все сделали быстро и четко. Однозначно рекомендую");
    setReward("Алексей Петров", "Все супер, спасибо за выполненный проект.");
    setReward("Светлана Прусова", "Спасибо большое за работу. Все чётко и быстро. Без лишних вопросов. Приехали и забили на следующей день после встречи. Всегда были на связи. Однозначно рекомендую эту компанию.");
    setReward("Константин", "Качественные сваи, забивают на совесть.");
    setReward("Вадим", "Работа выполнена в полном объеме, качественно и быстро. Особая благодарность Виктору за организацию процесса работы. Однозначно рекомендую.");

    if (document.querySelectorAll('.blockReward').length > 0) {
        new Splide('.splide', {
            type       : 'loop',
            perPage    : 4,
            gap        : '20px',
            pagination : true,
            autoplay   : true,
            interval   : 3000,
            pauseOnHover: true,
            padding    : {left: '20px', right: '20px'},
            breakpoints: {
                1250: { perPage: 3 },
                768 : { perPage: 2 },
                480 : { perPage: 1 }
            }
        }).mount();
    }
}
};

        document.addEventListener('DOMContentLoaded', () => {
            loadPage(window.location.href);
            initSlider();
            initGallery();
            initClasslistButton();
            compileAnimations();
            initValidate();
            callculateOrder();
        })

        function compileAnimations() {
        const aboutSection = document.querySelectorAll('.animate');
        const scrollOnObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(x => {
                if (x.isIntersecting) {
                    x.target.classList.add('visible');
                    observer.unobserve(x.target);
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        });

        aboutSection.forEach(el => {
            scrollOnObserver.observe(el)
        })

        const cardSection = document.querySelectorAll('.animate-card');
        const scrollOnObserverCard = new IntersectionObserver((entries, observer) => {
            entries.forEach(x => {
                if (x.isIntersecting) {
                    x.target.classList.add('visible');
                    observer.unobserve(x.target);
                }
            })
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px 50px 0px'
        });

        cardSection.forEach(el => {
            scrollOnObserverCard.observe(el);
        })

        const textSection = document.querySelectorAll('.animated-text');

        const scrollOnObserverText = new IntersectionObserver((entries, observer) => {
            entries.forEach(x => {
                if (x.isIntersecting) {
                    x.target.classList.add('visible');
                    observer.unobserve(x.target);
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px 25px 0px'
        });

        textSection.forEach(el => {
            scrollOnObserverText.observe(el)
        });

        const achievSection = document.querySelectorAll('.our_achievement');
        const scrollOnObserverAchiv = new IntersectionObserver((entries, observer) => {
            entries.forEach(x => {
                if (x.isIntersecting) {
                    cicleAnimations();
                    const cards = x.target.querySelectorAll('.animated-cards');
                    cards.forEach(card => card.classList.add('visible'));
                    observer.unobserve(x.target);
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px 50px 0px'
        });

        achievSection.forEach(el => {
            scrollOnObserverAchiv.observe(el)
        });

        
        

        function cicleAnimations() {
            const cicleWork = () => {
                const cicle = document.querySelector('.cicle-animation-work');
                const target = 350;
                let current = 0;

                const timerAnim = setInterval(() => {
                    current++;
                    cicle.textContent = current;

                    if (current >= target) {
                        clearInterval(timerAnim)
                    }
                }, 5)
            };

            const cicleClient = () => {
                const cicle = document.querySelector('.cicle-animation-client');
                const target = 175;
                let current = 0;

                const timerAnim = setInterval(() => {
                    current++;
                    cicle.textContent = current;

                    if (current >= target) {
                        clearInterval(timerAnim)
                    }
                }, 10)
            };

            const cicleExp = () => {
                const cicle = document.querySelector('.cicle-animation-exp');
                const target = 5;
                let current = 0;

                const timerAnim = setInterval(() => {
                    current++;
                    cicle.textContent = current;

                    if (current >= target) {
                        clearInterval(timerAnim)
                    }
                }, 250)
            }
            cicleWork();
            cicleClient();
            cicleExp();
        }        
    }

let userCallback = {
    nameUser: '',
    email: '',
    phoneUser: '',
    messageUser: '',
};

function validateData() {
    const nameInput = document.getElementById('inputName');
    const emailInput = document.getElementById('inputEmail');
    const messageInput = document.getElementById('messageUser');
    const numberInput = document.getElementById('inputNumber');
    if (!nameInput || !emailInput || !messageInput || !numberInput) return false;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const phone = numberInput.value.trim();

    if (name === '' || email === '' || message === '' || phone === '') {
        return false;
    }

    userCallback = {
        nameUser: name,
        email: email,
        phoneUser: phone,
        messageUser: message
    };
    return true;
}

function initValidate() {
const selector = document.querySelector('.contactus-block');
if (!selector) return;
const buttonSubmit = document.querySelector('.contactus-button__submit');
const number = document.getElementById('inputNumber');
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const messageUser = document.getElementById('messageUser');

const blockTime = 10 * 60 * 1000;

function checkBlockStatus() {
    const blockedUntil = localStorage.getItem('s13_seccions_v');

    if (!blockedUntil) return false;

    if (Date.now() < parseInt(blockedUntil)) {
        buttonSubmit.disabled = true;

    const timeLeft = parseInt(blockedUntil) - Date.now();
    setTimeout(() => {
        localStorage.removeItem('s13_seccions_v');
        buttonSubmit.disabled = false;
    }, timeLeft)
        return true;
    }
    localStorage.removeItem('s13_seccions_v');
    buttonSubmit.disabled = false;
    return false;
};
checkBlockStatus();

number.addEventListener('input', () => {
    const value = number.value.trim();
    const isValid = value.startsWith('+7') || value.startsWith('8');
    number.classList.add('error-border', !isValid);
});

const looseRegex = /^(?=.*@)(?=.*\.(com|ru))/i
buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const isValid = validateData();
    const isSpammer = checkBlockStatus();
    
    [inputEmail, inputName, messageUser, number].forEach((x) => {
        if (x.value.trim() === '') {
            x.classList.toggle('error-border');
        }
    })

    if (isSpammer) {
        Toastify({
            text: "Вы уже отправляли форму ранее, подождите пожалуйста.",
            duration: 3500,           
            gravity: "bottom",            
            position: "right",          
            close: true,                
            stopOnFocus: true,          
            style: {
                background: "#ef4444",   
                color: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }
        }).showToast();
        return;
    } 

    if (!isValid) {
            Toastify({
            text: "Заполните все поля ввода!",
            duration: 3500,            
            gravity: "bottom",            
            position: "right",          
            close: true,                
            stopOnFocus: true,          
            style: {
                background: "#ef4444",   
                color: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }
        }).showToast();
            return;
        } else if (!looseRegex.test(inputEmail.value)) {
            Toastify({
            text: "Введите корректный адрес электронной почты!",
            duration: 3500,            
            gravity: "bottom",            
            position: "right",          
            close: true,                
            stopOnFocus: true,          
            style: {
                background: "#ef4444",   
                color: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }
        }).showToast();
            return;
        } else {
            Toastify({
            text: `Благодарим! Наш менеджер свяжется с вами в ближайшее время.`,
            duration: 5000,
            gravity: "bottom",
            position: "right",
            close: true,
            style: {
                background: "#067a54ff",  
                color: "#ffffff",
                borderRadius: "8px"
            }
        }).showToast();

        [inputEmail, inputName, messageUser].forEach((x) => x.value = '');
        const tenMinutesLater = Date.now() + blockTime;
        localStorage.setItem('s13_seccions_v1', tenMinutesLater); // Не забыть вернуть прелоадер, и кд на отправку
        postData();
        }
});
}

async function postData() {
            const signal = AbortSignal.timeout(10000);
            const mappedData = {
                "fi-sender-fullName": userCallback.nameUser,
                "fi-sender-email": userCallback.email,
                "fi-text-phone": userCallback.phoneUser,
                "fi-text-message": userCallback.messageUser
            };
            const formData = new FormData();
            Object.keys(mappedData).forEach(key => {
                if (mappedData[key] !== undefined && mappedData[key] !== null) {
                    formData.append(key, mappedData[key]);
                }
            })
            const post = fetch('https://forminit.com/f/jubbos8hg8d', {
                signal,
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData,
                }).then(async res => {
                    if (res.ok) {
                        console.log("Данные успешно отправлены!")
                    } else {
                        const errorText = await res.text();
                        console.error("Ошибка отправки данных:", errorText);
                    }
                })
                .catch(err => console.error("Ошибка сети: ", err))
            }


function callculateOrder() {
    const btn = document.querySelector('.callback_order_hero');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        const dialog = modal();
        dialog.showModal();
        dialog.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dialog.remove();
            };
        });

        dialog.addEventListener('click', (e) => {
            const rect = dialog.getBoundingClientRect();

            const clickInRect = (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom 
            );

            if (clickInRect) {
                dialog.close();
                dialog.remove();
            }
        })

        let sumSectionBlock = 0;
        let sum = 0;

        const header = document.createElement('div');
        header.classList.add('modal-header');
        const mainTitle = document.createElement('h3');
        mainTitle.textContent = 'Калькулятор стоимости';
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');
        closeBtn.innerHTML = '&times;'; 
        closeBtn.addEventListener('click', () => { 
            dialog.remove(); 
        });
        header.append(mainTitle, closeBtn);

        const container = document.createElement('div');
        container.classList.add('container-modal');
        const leftPartContainer = document.createElement('div');
        leftPartContainer.classList.add('left-part-container-modal');
        const rightPartContainer = document.createElement('div');
        rightPartContainer.classList.add('right-part-container-modal');

        const rightPartTitle = document.createElement('h2');
        rightPartTitle.textContent = 'Ориентировочный расчет';
        rightPartTitle.classList.add('right-title-modal');

        const blockSum = document.createElement('div');
        blockSum.classList.add('block-sum-modal');
        const preSumP = document.createElement('h4');
        preSumP.textContent = 'Приблизительная стоимость:';
        const sumText = document.createElement('h2');
        sumText.textContent = '~ 0 ₽'; 
        blockSum.append(preSumP, sumText);

        const disclaimer = document.createElement('p');
        disclaimer.classList.add('disclaimer-text');
        disclaimer.textContent = '*Данный расчет является ориентировочным и не является публичной офертой. Включает базовые работы и материалы.';

        const contactBlock = document.createElement('div');
        contactBlock.classList.add('contact-block');
        contactBlock.innerHTML = `
            <p>Для точной сметы свяжитесь с менеджером:</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button style="background-color: #002e5d; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; flex-grow: 1;">ЗАКАЗАТЬ ЗВОНОК</button>
                <button style="background-color: #25d366; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;"><i class="fa-brands fa-whatsapp"></i></button>
                <button style="background-color: #0088cc; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;"><i class="fa-brands fa-telegram"></i></button>
            </div>
            <button style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; cursor: pointer; width: 100%;">Связаться в мессенджере</button>
        `;

        rightPartContainer.append(rightPartTitle, blockSum, disclaimer, contactBlock);

        const title = document.createElement('h2');
        title.classList.add('modal-title');
        title.textContent = 'Параметры расчета';

        const groupSection = document.createElement('div');
        groupSection.classList.add('input-group');
        const sectionP = document.createElement('label');
        sectionP.textContent = 'Типоразмер сваи (сечение), мм';
        const containerPickSection = document.createElement('div');
        containerPickSection.classList.add('section-pick-modal');

        ['150x150', '200x200', '300x300', 'Другой'].forEach((text, index) => {
            const span = document.createElement('span');
            span.textContent = text;
            span.dataset.value = [1000, 1500, 2000, 0][index];
            containerPickSection.append(span);
        });
        groupSection.append(sectionP, containerPickSection);

        containerPickSection.addEventListener('click', (e) => {
            const targetSpan = e.target.closest('span');
            if (!targetSpan) return;
            
            containerPickSection.querySelectorAll('span').forEach(s => s.classList.remove('border-pick'));
            targetSpan.classList.add('border-pick');
            sumSectionBlock = Number(targetSpan.dataset.value);
        });

        const groupSelect = document.createElement('div');
        groupSelect.classList.add('input-group');
        const selectP = document.createElement('label');
        selectP.textContent = 'Длина сваи, м';
        const select = document.createElement('select');
        select.classList.add('select-modal');
        [
            {val: '1.25', text: '3 м'}, {val: '1.5', text: '6 м'},
            {val: '1.75', text: '9 м'}, {val: '2', text: '12 м'}, {val: '0', text: 'Своё'}
        ].forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.val;
            option.textContent = opt.text;
            select.append(option);
        });
        groupSelect.append(selectP, select);

        const groupQuantity = document.createElement('div');
        groupQuantity.classList.add('input-group');
        const inputSumP = document.createElement('label');
        inputSumP.textContent = 'Количество, шт.';
        const inputSum = document.createElement('input');
        inputSum.type = 'number';
        inputSum.value = 1;
        inputSum.classList.add('input-sum-modal');
        groupQuantity.append(inputSumP, inputSum);

        const groupGeo = document.createElement('div');
        groupGeo.classList.add('input-group');
        const inputGeoP = document.createElement('label');
        inputGeoP.textContent = 'Местоположение';
        const inputGeo = document.createElement('input');
        inputGeo.type = 'text';
        inputGeo.placeholder = 'Укажите полный адрес';
        inputGeo.classList.add('input-modal-geo');
        groupGeo.append(inputGeoP, inputGeo);

        
        const buttonOrder = document.createElement('button');
        buttonOrder.textContent = 'Рассчитать';
        buttonOrder.classList.add('button-modal-order');

        buttonOrder.addEventListener('click', () => {
            let currentCoifValue = select.value;
            const quantity = Number(inputSum.value);
            
            if (currentCoifValue === '0') {
                sumText.textContent = `Если вы выбрали индивидуальную длину сваи, рассчитать стоимость автоматически невозможно. Пожалуйста, свяжитесь с менеджером для уточнения деталей.`
                sumText.style.fontSize = '1rem';
                return;   
            }
           
            if (sumSectionBlock === 0) {
                sumText.textContent = 'Выберите сечение!';
                sumText.style.fontSize = '1.2rem';
                return;
            }
            
            sumText.style.fontSize = '1.8rem';
            sum = (Number(currentCoifValue) * quantity) * sumSectionBlock;
            sumText.textContent = `~ ${sum.toLocaleString('ru-RU')} ₽`; 
        });

        leftPartContainer.append(title, groupSection, groupSelect, groupQuantity, groupGeo, buttonOrder);

        container.append(leftPartContainer, rightPartContainer);
        
        dialog.innerHTML = '';
        dialog.append(header, container);
    });
}

function modal() {
    let dialog = document.querySelector('dialog.modalOrder');
    if (!dialog) {
        const app = document.getElementById('app')
        dialog = document.createElement('dialog');
        dialog.classList.add('modalOrder');
        app.appendChild(dialog);
    }
    return dialog;
}
