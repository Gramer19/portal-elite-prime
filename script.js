document.addEventListener('DOMContentLoaded', () => {
  // Inicializar iconos de Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // --- 1. VALIDACIÓN DE LOGIN POR CÓDIGO SIS (index.html) ---
  const loginForm = document.querySelector('form');
  if (loginForm && window.location.pathname.includes('index.html')) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Captura el input del Código SIS (primer campo de texto/número) y la contraseña
      const sisInput = loginForm.querySelector('input[type="text"], input[type="number"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');

      const codSIS = sisInput ? sisInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      // Credenciales requeridas para pruebas
      const SIS_VALIDO = "202401234";
      const PASS_VALIDO = "123456";

      if (codSIS === SIS_VALIDO && password === PASS_VALIDO) {
        // Guardar estado de sesión activa
        localStorage.setItem('usuarioLogueado', 'true');
        localStorage.setItem('nombreUsuario', 'Estudiante Elite');
        
        // Redirigir al Dashboard
        window.location.href = 'dashboard.html';
      } else {
        alert('❌ Credenciales incorrectas.\n\nUsa:\nCódigo SIS: 202401234\nContraseña: 123456');
      }
    });
  }

  // --- 2. MOSTRAR NOMBRE DE USUARIO ---
  const nombreGuardado = localStorage.getItem('nombreUsuario');
  const contenedoresUsuario = document.querySelectorAll('.nombre-usuario-login');
  
  if (nombreGuardado && contenedoresUsuario.length > 0) {
    contenedoresUsuario.forEach(el => el.textContent = nombreGuardado);
  }

  // --- 3. CERRAR SESIÓN ---
  const btnCerrarSesion = document.querySelectorAll('a[href="index.html"]');
  btnCerrarSesion.forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogueado');
      localStorage.removeItem('nombreUsuario');
    });
  });

  // --- 4. LÓGICA DE MATERIALES (materiales.html) ---
  const contenedorMateriales = document.getElementById('contenedor-materiales');
  if (contenedorMateriales) {
    const listaMateriales = [
      { id: 1, titulo: "Guía Práctica - Estadística I", materia: "Estadística I", tipo: "guia", url: "#" },
      { id: 2, titulo: "Libro de Contabilidad General", materia: "Contabilidad", tipo: "libro", url: "#" },
      { id: 3, titulo: "Ejercicios Resueltos de Funciones", materia: "Cálculo II", tipo: "guia", url: "#" }
    ];

    const visorTitulo = document.getElementById('visor-titulo');
    const visorMateria = document.getElementById('visor-materia');
    const visorBox = document.getElementById('visor-box');
    const btnDescargar = document.getElementById('btn-descargar');

    function renderizarMateriales(items) {
      contenedorMateriales.innerHTML = '';
      if (items.length === 0) {
        contenedorMateriales.innerHTML = '<p class="text-xs text-zinc-500 text-center py-6">No se encontraron materiales.</p>';
        return;
      }

      items.forEach(item => {
        const card = document.createElement('div');
        card.className = "flex items-center justify-between p-4 bg-[#141310] border border-[#2a261f] rounded-xl hover:border-[#e5b842]/40 transition-all";
        card.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="p-2.5 bg-[#e5b842]/10 text-[#e5b842] rounded-lg">
              <i data-lucide="book-open" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="text-sm font-semibold">${item.titulo}</h4>
              <p class="text-xs text-zinc-400">${item.materia}</p>
            </div>
          </div>
          <button onclick="seleccionarMaterial(${item.id})" class="px-4 py-1.5 bg-[#2a261f] hover:bg-[#e5b842] hover:text-black text-xs font-semibold rounded-lg transition-all">Ver</button>
        `;
        contenedorMateriales.appendChild(card);
      });
      if (window.lucide) lucide.createIcons();
    }

    window.seleccionarMaterial = function(id) {
      const item = listaMateriales.find(m => m.id === id);
      if (!item) return;

      visorTitulo.textContent = item.titulo;
      visorMateria.textContent = item.materia;
      visorBox.innerHTML = `
        <div class="text-center">
          <i data-lucide="file-check" class="w-12 h-12 text-[#e5b842] mx-auto mb-2"></i>
          <p class="text-xs text-zinc-300 font-medium">Documento preparado</p>
          <span class="text-[10px] text-zinc-500 block mt-1">Haz clic en descargar para obtener la versión completa</span>
        </div>
      `;
      btnDescargar.href = item.url;
      btnDescargar.classList.remove('opacity-50', 'cursor-not-allowed');
      if (window.lucide) lucide.createIcons();
    };

    renderizarMateriales(listaMateriales);
  }

  // --- 5. LÓGICA DE EXÁMENES (examenes.html) ---
  const contenedorExamenes = document.getElementById('contenedor-examenes');
  if (contenedorExamenes) {
    const listaExamenes = [
      { id: 101, titulo: "Primer Parcial Resuelto (1-2025)", materia: "Cálculo II", tipo: "parcial", url: "#" },
      { id: 102, titulo: "Examen Final Resuelto (2-2024)", materia: "Estadística I", tipo: "final", url: "#" },
      { id: 103, titulo: "Segundo Parcial Modelo A", materia: "Contabilidad", tipo: "parcial", url: "#" }
    ];

    const visorExamenTitulo = document.getElementById('visor-examen-titulo');
    const visorExamenMateria = document.getElementById('visor-examen-materia');
    const visorExamenBox = document.getElementById('visor-examen-box');
    const btnDescargarExamen = document.getElementById('btn-descargar-examen');

    function renderizarExamenes(items) {
      contenedorExamenes.innerHTML = '';
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = "flex items-center justify-between p-4 bg-[#141310] border border-[#2a261f] rounded-xl hover:border-[#e5b842]/40 transition-all";
        card.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="p-2.5 bg-[#e5b842]/10 text-[#e5b842] rounded-lg">
              <i data-lucide="file-check" class="w-5 h-5"></i>
            </div>
            <div>
              <h4 class="text-sm font-semibold">${item.titulo}</h4>
              <p class="text-xs text-zinc-400">${item.materia}</p>
            </div>
          </div>
          <button onclick="seleccionarExamen(${item.id})" class="px-4 py-1.5 bg-[#2a261f] hover:bg-[#e5b842] hover:text-black text-xs font-semibold rounded-lg transition-all">Ver</button>
        `;
        contenedorExamenes.appendChild(card);
      });
      if (window.lucide) lucide.createIcons();
    }

    window.seleccionarExamen = function(id) {
      const item = listaExamenes.find(e => e.id === id);
      if (!item) return;

      visorExamenTitulo.textContent = item.titulo;
      visorExamenMateria.textContent = item.materia;
      visorExamenBox.innerHTML = `
        <div class="text-center">
          <i data-lucide="file-text" class="w-12 h-12 text-[#e5b842] mx-auto mb-2"></i>
          <p class="text-xs text-zinc-300 font-medium">Examen cargado correctamente</p>
          <span class="text-[10px] text-zinc-500 block mt-1">Listo para descargar en PDF</span>
        </div>
      `;
      btnDescargarExamen.href = item.url;
      btnDescargarExamen.classList.remove('opacity-50', 'cursor-not-allowed');
      if (window.lucide) lucide.createIcons();
    };

    renderizarExamenes(listaExamenes);
  }
});