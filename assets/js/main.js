/**

* ============================================================
* PORTAL DO CONCURSO PÚBLICO DE INGRESSO EXTERNO 2026
* DIRECÇÃO MUNICIPAL DA EDUCAÇÃO DE MENONGUE
* ============================================================
*
* Ficheiro: js/main.js
* Função: JavaScript global do portal
*
* Este ficheiro pode ser carregado em todas as páginas:
* * index.html
* * inscricao-professores.html
* * inscricao-regime-geral.html
* * consultar.html
* * resultados.html
* * requisitos.html
* * cronograma.html
* * contactos.html
* * páginas administrativas
*
* A lógica específica de cada página deve permanecer
* no respectivo ficheiro JavaScript.
* ============================================================
  */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

```
/* ========================================================
   1. MENU MOBILE
======================================================== */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navbar.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        // Alterar ícone do menu
        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.className = isOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";
        }

    });


    // Fechar menu ao clicar num link
    const navLinks = navbar.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "fa-solid fa-bars";
            }

        });

    });


    // Fechar menu ao clicar fora
    document.addEventListener("click", function (event) {

        if (
            navbar.classList.contains("active") &&
            !navbar.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navbar.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = "fa-solid fa-bars";
            }

        }

    });

}


/* ========================================================
   2. CABEÇALHO AO FAZER SCROLL
======================================================== */

const header = document.querySelector(".main-header");

function handleHeaderScroll() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* ========================================================
   3. LINKS INTERNOS COM SCROLL SUAVE
======================================================== */

const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
);

internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight = header
            ? header.offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* ========================================================
   4. PÁGINA ACTIVA NO MENU
======================================================== */

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "index.html";

const allNavLinks =
    document.querySelectorAll(
        ".navbar a[href]"
    );

allNavLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href")
            .split("/")
            .pop()
            .split("#")[0]
            .toLowerCase();

    if (
        linkPage === currentPage &&
        linkPage !== ""
    ) {

        link.classList.add("active");

    }

});


/* ========================================================
   5. FECHAR ALERTAS
======================================================== */

const closeButtons =
    document.querySelectorAll(
        "[data-close-alert]"
    );

closeButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const alert =
                button.closest(
                    ".alert, .notice-card, .notification"
                );

            if (alert) {

                alert.style.opacity = "0";

                alert.style.transform =
                    "translateY(-10px)";

                setTimeout(function () {

                    alert.remove();

                }, 300);

            }

        }
    );

});


/* ========================================================
   6. VISUALIZAÇÃO DO NOME DOS FICHEIROS
   
   Funciona com:
   <input type="file">
   <span class="file-name">
   ======================================================== */

const fileInputs =
    document.querySelectorAll(
        'input[type="file"]'
    );

fileInputs.forEach(function (input) {

    input.addEventListener(
        "change",
        function () {

            const container =
                input.closest(
                    ".document-upload, .upload, .form-group"
                );

            if (!container) {
                return;
            }

            const fileName =
                container.querySelector(
                    ".file-name"
                );

            if (!fileName) {
                return;
            }

            if (
                input.files &&
                input.files.length > 0
            ) {

                const file =
                    input.files[0];

                fileName.textContent =
                    file.name;

                fileName.classList.add(
                    "selected"
                );

            } else {

                fileName.textContent =
                    "Nenhum ficheiro seleccionado";

                fileName.classList.remove(
                    "selected"
                );

            }

        }
    );

});


/* ========================================================
   7. VALIDAÇÃO VISUAL DOS CAMPOS
======================================================== */

const requiredFields =
    document.querySelectorAll(
        "input[required], select[required], textarea[required]"
    );

requiredFields.forEach(function (field) {

    field.addEventListener(
        "blur",
        function () {

            validateField(field);

        }
    );

    field.addEventListener(
        "input",
        function () {

            if (
                field.classList.contains(
                    "invalid"
                )
            ) {

                validateField(field);

            }

        }
    );

    field.addEventListener(
        "change",
        function () {

            validateField(field);

        }
    );

});


/* ========================================================
   8. ANIMAÇÃO DOS ELEMENTOS AO ENTRAR NO ECRÃ
======================================================== */

const animatedElements =
    document.querySelectorAll(
        ".application-card, " +
        ".information-item, " +
        ".form-section, " +
        ".document-upload, " +
        ".notice-card"
    );

if (
    animatedElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.08
            }
        );

    animatedElements.forEach(
        function (element) {

            element.classList.add(
                "animate-on-scroll"
            );

            observer.observe(
                element
            );

        }
    );

}


/* ========================================================
   9. ANO AUTOMÁTICO DO RODAPÉ
   
   Utilize no HTML:
   <span data-current-year></span>
======================================================== */

const yearElements =
    document.querySelectorAll(
        "[data-current-year]"
    );

yearElements.forEach(
    function (element) {

        element.textContent =
            new Date().getFullYear();

    }
);


/* ========================================================
   10. PREVENIR DUPLO ENVIO DE FORMULÁRIOS
   
   A lógica de processamento permanece no JS específico.
======================================================== */

const forms =
    document.querySelectorAll(
        "form"
    );

forms.forEach(function (form) {

    form.addEventListener(
        "submit",
        function () {

            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );

            if (!submitButton) {
                return;
            }

            // Não bloquear se o formulário já estiver
            // a ser processado por outro script.
            if (
                submitButton.dataset.processing === "true"
            ) {
                return;
            }

            submitButton.dataset.processing =
                "true";

            submitButton.classList.add(
                "is-loading"
            );

            submitButton.setAttribute(
                "aria-busy",
                "true"
            );

            const originalText =
                submitButton.innerHTML;

            submitButton.dataset.originalText =
                originalText;

            // O script específico da página
            // pode restaurar o botão quando necessário.

        }
    );

});


/* ========================================================
   11. MÁSCARA SIMPLES PARA TELEFONE ANGOLANO
======================================================== */

const phoneInputs =
    document.querySelectorAll(
        'input[type="tel"]'
    );

phoneInputs.forEach(function (input) {

    input.addEventListener(
        "input",
        function () {

            let value =
                input.value.replace(
                    /[^\d+]/g,
                    ""
                );

            if (
                value.startsWith("244") &&
                !value.startsWith("+244")
            ) {

                value =
                    "+" + value;

            }

            input.value =
                value.slice(0, 13);

        }
    );

});


/* ========================================================
   12. CONFIRMAÇÃO AO SAIR DE FORMULÁRIO PREENCHIDO
   
   Apenas para formulários que tenham:
   class="application-form"
======================================================== */

const applicationForms =
    document.querySelectorAll(
        ".application-form"
    );

applicationForms.forEach(function (form) {

    let formChanged = false;

    form.addEventListener(
        "input",
        function () {

            formChanged = true;

        }
    );

    form.addEventListener(
        "submit",
        function () {

            formChanged = false;

        }
    );

    window.addEventListener(
        "beforeunload",
        function (event) {

            if (!formChanged) {
                return;
            }

            event.preventDefault();

            event.returnValue = "";

        }
    );

});


/* ========================================================
   13. ACESSIBILIDADE
======================================================== */

document.querySelectorAll(
    "button"
).forEach(function (button) {

    if (
        !button.getAttribute(
            "type"
        )
    ) {

        button.setAttribute(
            "type",
            "button"
        );

    }

});


/* ========================================================
   14. LOG DE INICIALIZAÇÃO
   
   Apenas para desenvolvimento.
   Pode ser removido em produção.
======================================================== */

console.log(
    "Portal do Concurso Público de Ingresso Externo 2026 — " +
    "Direcção Municipal da Educação de Menongue carregado."
);
```

});

/* ============================================================
FUNÇÃO GLOBAL DE VALIDAÇÃO
============================================================ */

function validateField(field) {

```
if (!field) {
    return true;
}

let valid = true;

// Campo obrigatório vazio
if (
    field.hasAttribute("required") &&
    !field.value.trim()
) {

    valid = false;

}


// Validação de e-mail
if (
    field.type === "email" &&
    field.value.trim()
) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        !emailPattern.test(
            field.value.trim()
        )
    ) {

        valid = false;

    }

}


// Validação visual
if (valid) {

    field.classList.remove(
        "invalid"
    );

    field.classList.add(
        "valid"
    );

} else {

    field.classList.remove(
        "valid"
    );

    field.classList.add(
        "invalid"
    );

}

return valid;
```

}

/* ============================================================
FUNÇÃO GLOBAL PARA FORMATAR NÚMERO DE INSCRIÇÃO
============================================================ */

function formatApplicationNumber(
number
) {

```
if (!number) {
    return "";
}

return String(number)
    .trim()
    .toUpperCase();
```

}

/* ============================================================
FUNÇÃO GLOBAL PARA MOSTRAR NOTIFICAÇÕES
============================================================ */

function showNotification(
message,
type = "info"
) {

```
const notification =
    document.createElement(
        "div"
    );

notification.className =
    "global-notification " +
    "notification-" +
    type;

notification.innerHTML = `
    <div class="notification-content">
        <span>${message}</span>
        <button
            type="button"
            aria-label="Fechar notificação"
        >
            &times;
        </button>
    </div>
`;

document.body.appendChild(
    notification
);


requestAnimationFrame(
    function () {

        notification.classList.add(
            "show"
        );

    }
);


const closeButton =
    notification.querySelector(
        "button"
    );

closeButton.addEventListener(
    "click",
    function () {

        removeNotification(
            notification
        );

    }
);


setTimeout(
    function () {

        removeNotification(
            notification
        );

    },
    5000
);
```

}

/* ============================================================
REMOVER NOTIFICAÇÃO
============================================================ */

function removeNotification(
notification
) {

```
if (!notification) {
    return;
}

notification.classList.remove(
    "show"
);

setTimeout(
    function () {

        if (
            notification.parentNode
        ) {

            notification.remove();

        }

    },
    300
);
```

}

/* ============================================================
FUNÇÃO GLOBAL: FORMATAR DATA
============================================================ */

function formatDate(
date
) {

```
if (!date) {
    return "—";
}

const parsedDate =
    new Date(date);

if (
    Number.isNaN(
        parsedDate.getTime()
    )
) {

    return "—";

}

return parsedDate.toLocaleDateString(
    "pt-PT",
    {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }
);
```

}

/* ============================================================
FUNÇÃO GLOBAL: CAPITALIZAR NOME
============================================================ */

function formatCandidateName(
name
) {

```
if (!name) {
    return "";
}

return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(function (word) {

        return word.charAt(0)
            .toUpperCase() +
            word.slice(1);

    })
    .join(" ");
```

}
