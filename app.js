const burger = document.querySelector('.burger');
const navBar = document.querySelector('.navbar');
const tabsItems = document.querySelectorAll('.tabs__item');
const vacancyItem = document.querySelectorAll('.vacancy-item');
const vacancyInfo = document.querySelectorAll('.vacancy-info');
const accordionList = document.querySelectorAll('.accordion__list');
const accordions = document.querySelectorAll('.accordion');
const swipers = document.querySelectorAll('.swiper');
const productTabsItems = document.querySelectorAll('.product-tabs__item');
const contactsTabs = document.querySelectorAll('.contacts-tabs__item');
const contactsList = document.querySelectorAll('.contact__list');
const maps = document.querySelectorAll('.map');
const body = document.querySelector('body')
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const btns = document.querySelectorAll('.btn');
const btnMain = document.querySelector('.btn-main');
const formClose = document.querySelectorAll('.form__close');


function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
    }
}

const len = 0;

function mask(event) {
    const matrix = "",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) : a
    });
    i = this.value.indexOf("_");
    if (val.length < len) i = this.value.lastIndexOf(val.substr(-1)) + 1;
    if (i != -1) {
        i < 5 && (i = 3);
        this.value = this.value.slice(0, i);
    }
    if (event.type == "blur") {
        if (this.value.length < 5) this.value = ""
    }
    else setCursorPosition(this.value.length, this);
    len = val.length;
};

const phoneFields = document.getElementById("phone");
for (i = 0; i < phoneFields.length; i++) {
    phoneFields[i].addEventListener("input", mask, false);
    phoneFields[i].addEventListener("focus", mask, false);
    phoneFields[i].addEventListener("blur", mask, false);

}

const phone = document.getElementById('phone');
phone.addEventListener('input', function (e) {
    let arr = this.value.replace(/[^\dA-Z]/g, '').replace(/[\s-)(]/g, '').split('');
    if (arr.length >= 1) arr.splice(0, 0, '');
    if (arr.length > 4) arr.splice(4, 0, '');
    if (arr.length > 8) arr.splice(8, 0, '');
    this.value = arr.toString().replace(/[,]/g, '');
});

burger.addEventListener('click', () => {
    navBar.classList.toggle('active')
    burger.classList.toggle('burger--active')
})

btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');

        modals.forEach((el) => {
            el.classList.remove('modal--visible');
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
        modalOverlay.classList.add('modal-overlay--visible');

        if (modalOverlay.classList.contains('modal-overlay--visible')) {
            body.style.overflow = 'hidden';
        }
    });
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target == modalOverlay) {
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            el.classList.remove('modal--visible');
            body.style.overflow = 'auto'
        });
    }
});
btnMain.addEventListener('click', () => {
    modals.forEach((el) => {
        el.classList.remove('modal--visible');
        modalOverlay.classList.remove('modal-overlay--visible');
    });
    body.style.overflow = 'visible';
})
formClose.forEach((item) => {
    item.addEventListener('click', () => {
        modals.forEach((el) => {
            el.classList.remove('modal--visible');
            modalOverlay.classList.remove('modal-overlay--visible');
        });
        body.style.overflow = 'visible';
    })
})

modalOverlay.addEventListener('click', (e) => {

    if (e.target == modalOverlay) {
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            el.classList.remove('modal--visible');
            body.style.overflow = 'auto'
        });
    }
});

contactsTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        contactsList.forEach((item) => {
            item.classList.remove('active')
            if (item === contactsList[index])
                item.classList.add('active')
        })
        maps.forEach((item) => {
            item.classList.remove('active')
            if (item === maps[index])
                item.classList.add('active')
        })
        contactsTabs.forEach((item) => {
            item.classList.remove('active')
        })
        tab.classList.add('active')
    })
})

tabsItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        accordionList.forEach((item) => {
            item.classList.remove('active')
            if (item === accordionList[index])
                item.classList.add('active')
        })
        tabsItems.forEach((item) => {
            item.classList.remove('active')
        })
        tab.classList.add('active')
    })
})

productTabsItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        swipers.forEach((item) => {
            item.classList.remove('active')
            if (item === swipers[index])
                item.classList.add('active')
        })
        productTabsItems.forEach((item) => {
            item.classList.remove('active')
        })
        tab.classList.add('active')
    })
})

accordions.forEach(el => {
    el.addEventListener('click', (e) => {
        const self = e.currentTarget;
        const control = self.querySelector('.accordion__control');
        const content = self.querySelector('.accordion__content');

        self.classList.toggle('open');

        if (self.classList.contains('open')) {
            control.setAttribute('aria-expanded', true);
            content.setAttribute('aria-hidden', false);
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            control.setAttribute('aria-expanded', false);
            content.setAttribute('aria-hidden', true);
            content.style.maxHeight = null;
        }
    });
});
const swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});
const swiperPerson = new Swiper(".swiper-person", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

