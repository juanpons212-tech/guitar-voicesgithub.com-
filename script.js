<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guitar Voices · Afinador</title>
    <!-- Tailwind CDN (opcional, solo para estilos base) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* --- ESTILOS GLOBALES --- */
        body {
            background: #0f172a;
            font-family: system-ui, -apple-system, sans-serif;
            transition: background 0.3s, color 0.3s;
        }
        /* Contenedor principal */
        #app {
            max-width: 800px;
            margin: 0 auto;
            padding: 1.5rem 1rem 6rem;
        }
        /* Valvulas */
        #valvulas {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
            margin: 1.5rem 0;
        }
        .valvula {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #334155;
            border: 2px solid #475569;
            transition: all 0.2s ease;
        }
        .valvula.activa {
            background: #22c55e;
            box-shadow: 0 0 20px #22c55e88;
            transform: scale(1.3);
        }
        .valvula.media {
            background: #facc15;
            box-shadow: 0 0 12px #facc1588;
        }
        .valvula.lejos {
            background: #ef4444;
        }
        /* Centro valvula */
        #centroValvula {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            background: radial-gradient(circle, #e2e8f0, #94a3b8);
            transition: all 0.3s ease;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        #centroValvula.encendida {
            background: radial-gradient(circle, #86efac, #16a34a);
            box-shadow: 0 0 50px #22c55e99;
        }
        /* Targetas de afinación */
        .tarjeta {
            cursor: pointer;
            transition: all 0.2s;
        }
        .tarjeta:hover {
            border-color: #22c55e;
            transform: translateY(-2px);
        }
        /* Indicador de precisión */
        #indicadorAfinacion {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #cbd5e1;
            margin: 0 auto;
            transition: transform 0.15s ease, background 0.2s;
        }
        #indicadorAfinacion.correcto { background: #22c55e; }
        #indicadorAfinacion.izquierda { background: #3b82f6; }
        #indicadorAfinacion.derecha { background: #f59e0b; }
        /* Medidor de nivel */
        #nivelSonido {
            height: 100%;
            background: linear-gradient(90deg, #22c55e, #84cc16);
            border-radius: 20px;
            transition: width 0.1s;
        }
        /* Responsive */
        @media (max-width: 640px) {
            #nota { font-size: 3.5rem; }
            .valvula { width: 24px; height: 24px; }
            #centroValvula { width: 70px; height: 70px; font-size: 2rem; }
        }
        /* Modo oscuro (toggle) */
        .dark body { background: #0b1120; color: #e2e8f0; }
        .dark .bg-slate-800 { background: #1e293b; }
        .dark .bg-slate-700 { background: #334155; }
        .dark .tarjeta { background: #1e293b; border-color: #334155; }
    </style>
</head>
<body>
    <div id="app" class="text-white">

        <!-- HEADER -->
        <header class="text-center mb-8">
            <h1 id="tituloAfinador" class="text-4xl font-bold text-indigo-400">🎸 Guitar Voices</h1>
            <p class="text-slate-400 mt-2">Afinador inteligente</p>
        </header>

        <!-- BIBLIOTECA DE AFINACIONES -->
        <section id="biblioteca" class="mb-8">
            <h2 class="text-xl font-semibold mb-4 text-slate-300">Seleccioná tu afinación</h2>
            <div id="categorias" class="flex flex-wrap gap-3 mb-4">
                <button data-cat="abiertas" class="cat-btn px-4 py-2 rounded-full bg-indigo-600 text-white">Abiertas</button>
                <button data-cat="drop" class="cat-btn px-4 py-2 rounded-full bg-slate-700 text-white">Drop</button>
                <button data-cat="standard" class="cat-btn px-4 py-2 rounded-full bg-slate-700 text-white">Standard</button>
            </div>
            <div id="variantes" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
        </section>

        <!-- AFINADOR -->
        <section id="afinador" class="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-700">
            <div class="text-center mb-4">
                <div id="afinacionDisplay" class="text-slate-300 text-sm">
                    <span class="text-emerald-400 font-bold">Seleccioná una afinación</span>
                </div>
                <div id="objetivo" class="text-slate-400 text-xs mt-1">Esperando...</div>
            </div>

            <!-- NOTA Y FRECUENCIA -->
            <div class="flex flex-col items-center">
                <span id="nota" class="text-7xl font-bold text-slate-200 transition-all">--</span>
                <div class="flex gap-6 mt-2 text-sm text-slate-400">
                    <span id="frecuencia">0 Hz</span>
                    <span id="cent">0 cents</span>
                </div>
            </div>

            <!-- VÁLVULAS VISUALES -->
            <div id="valvulas"></div>
            <div id="centroValvula">🎸</div>

            <!-- INDICADOR DE PRECISIÓN -->
            <div id="indicadorAfinacion" class="mx-auto mt-2"></div>

            <!-- BARRA DE NIVEL DE SONIDO -->
            <div class="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div id="nivelSonido" style="width:0%"></div>
            </div>

            <!-- BOTÓN INICIAR / DETENER -->
            <div class="mt-6 text-center">
                <button id="iniciar" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-semibold transition">
                    🎤 Iniciar afinador
                </button>
            </div>

            <!-- ESTADO DE AFINACIÓN -->
            <div id="estadoAfinacion" class="mt-4 text-center text-sm text-slate-400">Esperando sonido...</div>

            <!-- CONTROLES EXTRAS -->
            <div class="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                <button id="siguienteCuerda" class="px-4 py-2 bg-slate-700 rounded-xl hover:bg-slate-600">Siguiente cuerda →</button>
                <button id="reiniciarCuerdas" class="px-4 py-2 bg-slate-700 rounded-xl hover:bg-slate-600">↻ Reiniciar</button>
                <button id="modoOscuro" class="px-4 py-2 bg-slate-700 rounded-xl hover:bg-slate-600">🌙</button>
            </div>
        </section>

        <!-- AUDIO PING (oculto) -->
        <audio id="ping" preload="auto">
            <source src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" type="audio/ogg">
        </audio>

        <!-- FOOTER -->
        <footer class="mt-12 text-center text-slate-500 text-xs border-t border-slate-800 pt-6">
            <p>🎸 Guitar Voices · v1.0</p>
        </footer>
    </div>

    <script>
        // ============================================================
        // 1. BIBLIOTECA DE AFINACIONES (estructura)
        // ============================================================
        const bibliotecaAfinaciones = {
            abiertas: {
                G: [{ nombre: "Open G", cuerdas: ["D", "G", "D", "G", "B", "D"] }],
                D: [{ nombre: "Open D", cuerdas: ["D", "A", "D", "F#", "A", "D"] }],
                C: [{ nombre: "Open C", cuerdas: ["C", "G", "C", "G", "C", "E"] }]
            },
            drop: {
                "Drop D": [{ nombre: "Drop D", cuerdas: ["D", "A", "D", "G", "B", "E"] }],
                "Drop C": [{ nombre: "Drop C", cuerdas: ["C", "G", "C", "F", "A", "D"] }]
            },
            standard: {
                "E Standard": [{ nombre: "E Standard", cuerdas: ["E", "A", "D", "G", "B", "E"] }]
            }
        };

        // ============================================================
        // 2. ESTADO GLOBAL
        // ============================================================
        let afinacionActual = null;
        let cuerdaActual = 0; // índice dentro de cuerdas
        let audioContext = null;
        let analyser = null;
        let buffer = null;
        let ultimaFrecuencia = 0;
        let ultimoPing = 0;

        const DOM = {
            variantes: document.getElementById('variantes'),
            afinacionDisplay: document.getElementById('afinacionDisplay'),
            objetivo: document.getElementById('objetivo'),
            nota: document.getElementById('nota'),
            frecuencia: document.getElementById('frecuencia'),
            cent: document.getElementById('cent'),
            iniciar: document.getElementById('iniciar'),
            ping: document.getElementById('ping'),
            valvulas: document.getElementById('valvulas'),
            centroValvula: document.getElementById('centroValvula'),
            indicador: document.getElementById('indicadorAfinacion'),
            nivelSonido: document.getElementById('nivelSonido'),
            estadoAfinacion: document.getElementById('estadoAfinacion'),
        };

        // ============================================================
        // 3. FUNCIONES PRINCIPALES
        // ============================================================

        // 3.1 Mostrar variantes
        function mostrarVariantes(tipo, nota) {
            DOM.variantes.innerHTML = '';
            const lista = bibliotecaAfinaciones[tipo]?.[nota] || [];
            lista.forEach(afinacion => {
                const boton = document.createElement('button');
                boton.className = 'tarjeta bg-slate-800 border border-slate-700 rounded-2xl p-4 w-full text-left';
                boton.innerHTML = `
                    <h3 class="text-lg font-bold">${afinacion.nombre}</h3>
                    <p class="text-slate-400 text-sm">${afinacion.cuerdas.join(' • ')}</p>
                `;
                boton.onclick = () => {
                    seleccionarAfinacion(afinacion);
                    document.getElementById('afinador').scrollIntoView({ behavior: 'smooth', block: 'center' });
                };
                DOM.variantes.appendChild(boton);
            });
        }

        // 3.2 Seleccionar afinación
        function seleccionarAfinacion(afinacion) {
            afinacionActual = afinacion;
            cuerdaActual = 0;
            DOM.afinacionDisplay.innerHTML = `
                <span class="text-emerald-400 font-bold">${afinacion.nombre}</span>
                <br><span class="text-slate-300">${afinacion.cuerdas.join(' - ')}</span>
            `;
            actualizarObjetivo();
            guardarUltimaAfinacion();
        }

        // 3.3 Actualizar objetivo (cuerda actual)
        function actualizarObjetivo() {
            if (!afinacionActual) {
                DOM.objetivo.textContent = 'Seleccioná una afinación';
                return;
            }
            const nota = afinacionActual.cuerdas[cuerdaActual] || '--';
            const num = 6 - cuerdaActual;
            DOM.objetivo.innerHTML = `Cuerda ${num}ª → <strong class="text-emerald-300">${nota}</strong>`;
        }

        // 3.4 Avanzar cuerda
        function avanzarCuerda() {
            if (!afinacionActual) return;
            cuerdaActual = (cuerdaActual + 1) % afinacionActual.cuerdas.length;
            actualizarObjetivo();
        }

        // 3.5 Reiniciar cuerdas
        function reiniciarCuerdas() {
            cuerdaActual = 0;
            actualizarObjetivo();
            DOM.estadoAfinacion.textContent = 'Reiniciado';
        }

        // 3.6 Guardar / cargar última afinación
        function guardarUltimaAfinacion() {
            if (afinacionActual) {
                localStorage.setItem('ultimaAfinacionGV', JSON.stringify(afinacionActual));
            }
        }
        function cargarUltimaAfinacion() {
            try {
                const data = localStorage.getItem('ultimaAfinacionGV');
                if (data) {
                    const af = JSON.parse(data);
                    if (af && af.nombre && af.cuerdas) {
                        seleccionarAfinacion(af);
                        return true;
                    }
                }
            } catch (e) {}
            return false;
        }

        // 3.7 Mostrar categoría
        function mostrarCategoria(cat) {
            const categorias = document.querySelectorAll('.cat-btn');
            categorias.forEach(b => b.classList.toggle('bg-indigo-600', b.dataset.cat === cat));
            const firstKey = Object.keys(bibliotecaAfinaciones[cat] || {})[0];
            if (firstKey) mostrarVariantes(cat, firstKey);
        }

        // ============================================================
        // 4. DETECCIÓN DE FRECUENCIA (autocorrelación)
        // ============================================================
        function encontrarFrecuencia(buffer, sampleRate) {
            let mejorOffset = -1, mejorValor = 0;
            for (let offset = 20; offset < 1000; offset++) {
                let suma = 0;
                for (let i = 0; i < buffer.length - offset; i++) {
                    suma += buffer[i] * buffer[i + offset];
                }
                if (suma > mejorValor) {
                    mejorValor = suma;
                    mejorOffset = offset;
                }
            }
            if (mejorOffset === -1) return null;
            return sampleRate / mejorOffset;
        }

        function convertirNotaCompleta(frecuencia) {
            const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
            const numero = 12 * Math.log2(frecuencia / 440) + 69;
            const midi = Math.round(numero);
            return {
                nota: notas[midi % 12],
                octava: Math.floor(midi / 12) - 1,
                completa: notas[midi % 12] + (Math.floor(midi / 12) - 1)
            };
        }

        function calcularCents(frecuencia) {
            const midi = 12 * Math.log2(frecuencia / 440) + 69;
            const redondeada = Math.round(midi);
            const freqCorrecta = 440 * Math.pow(2, (redondeada - 69) / 12);
            return { cents: Math.round(1200 * Math.log2(frecuencia / freqCorrecta)) };
        }

        // ============================================================
        // 5. VÁLVULAS VISUALES
        // ============================================================
        function crearValvulas() {
            DOM.valvulas.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const div = document.createElement('div');
                div.className = 'valvula';
                div.id = 'v' + (i + 1);
                DOM.valvulas.appendChild(div);
            }
        }

        function moverValvulas(cents) {
            const valvulas = document.querySelectorAll('.valvula');
            valvulas.forEach(v => v.className = 'valvula');
            let pos = Math.round(((cents + 50) / 100) * 8);
            pos = Math.max(0, Math.min(8, pos));
            const v = valvulas[pos];
            if (v) {
                if (Math.abs(cents) <= 5) v.classList.add('activa');
                else if (Math.abs(cents) <= 20) v.classList.add('media');
                else v.classList.add('lejos');
            }
            // centro valvula
            if (Math.abs(cents) <= 5) DOM.centroValvula.classList.add('encendida');
            else DOM.centroValvula.classList.remove('encendida');
        }

        // ============================================================
        // 6. AFINADOR (loop de detección)
        // ============================================================
        let detectando = false;

        function iniciarAfinador() {
            if (detectando) {
                // Detener
                if (audioContext) audioContext.close();
                audioContext = null;
                analyser = null;
                detectando = false;
                DOM.iniciar.textContent = '🎤 Iniciar afinador';
                DOM.estadoAfinacion.textContent = 'Detenido';
                return;
            }
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    audioContext = new AudioContext();
                    const source = audioContext.createMediaStreamSource(stream);
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 4096;
                    source.connect(analyser);
                    buffer = new Float32Array(analyser.fftSize);
                    detectando = true;
                    DOM.iniciar.textContent = '⏹ Detener';
                    DOM.estadoAfinacion.textContent = 'Escuchando...';
                    loopDetectar();
                })
                .catch(() => {
                    DOM.estadoAfinacion.textContent = '❌ No se pudo acceder al micrófono';
                });
        }

        function loopDetectar() {
            if (!detectando || !analyser) return;
            requestAnimationFrame(loopDetectar);
            analyser.getFloatTimeDomainData(buffer);
            const freq = encontrarFrecuencia(buffer, audioContext.sampleRate);
            if (!freq) return;
            ultimaFrecuencia = freq;
            const info = convertirNotaCompleta(freq);
            const { cents } = calcularCents(freq);

            // Actualizar UI
            DOM.nota.textContent = info.completa;
            DOM.frecuencia.textContent = freq.toFixed(2) + ' Hz';
            DOM.cent.textContent = cents + ' cents';

            // Nivel de sonido (aproximado)
            let suma = 0;
            for (let i = 0; i < buffer.length; i++) suma += buffer[i] * buffer[i];
            const rms = Math.sqrt(suma / buffer.length);
            DOM.nivelSonido.style.width = Math.min(rms * 200, 100) + '%';

            moverValvulas(cents);
            // Indicador
            const ind = DOM.indicador;
            ind.style.transform = `translateX(${Math.max(-40, Math.min(40, cents * 1.5))}px)`;
            ind.className = '';
            if (Math.abs(cents) <= 5) ind.classList.add('correcto');
            else if (cents < 0) ind.classList.add('izquierda');
            else ind.classList.add('derecha');

            // Verificar afinación contra la cuerda actual
            comprobarAfinacion(info.nota, cents);
        }

        function comprobarAfinacion(nota, cents) {
            if (!afinacionActual) return;
            const objetivo = afinacionActual.cuerdas[cuerdaActual] || '';
            if (nota === objetivo && Math.abs(cents) <= 5) {
                DOM.estadoAfinacion.innerHTML = '✅ Afinación perfecta';
                DOM.nota.classList.add('text-green-400');
                reproducirPing();
                // Avanzar automáticamente después de un momento
                if (DOM.estadoAfinacion.dataset.avanzado !== 'true') {
                    DOM.estadoAfinacion.dataset.avanzado = 'true';
                    setTimeout(() => {
                        avanzarCuerda();
                        DOM.estadoAfinacion.dataset.avanzado = '';
                    }, 800);
                }
            } else {
                DOM.nota.classList.remove('text-green-400');
                if (nota) {
                    DOM.estadoAfinacion.innerHTML = `🎯 ${nota} · ${Math.abs(cents)} cents`;
                }
            }
        }

        function reproducirPing() {
            const ahora = Date.now();
            if (ahora - ultimoPing < 1500) return;
            ultimoPing = ahora;
            const p = DOM.ping;
            if (p) {
                p.currentTime = 0;
                p.play().catch(() => {});
            }
        }

        // ============================================================
        // 7. INICIALIZACIÓN
        // ============================================================
        function init() {
            crearValvulas();
            // Cargar última afinación
            if (!cargarUltimaAfinacion()) {
                // Mostrar categoría por defecto
                mostrarCategoria('standard');
            }
            // Eventos de categorías
            document.querySelectorAll('.cat-btn').forEach(btn => {
                btn.onclick = () => {
                    const cat = btn.dataset.cat;
                    const firstKey = Object.keys(bibliotecaAfinaciones[cat] || {})[0];
                    if (firstKey) mostrarVariantes(cat, firstKey);
                };
            });
            // Botón iniciar
            DOM.iniciar.onclick = iniciarAfinador;

            // Botón siguiente cuerda
            document.getElementById('siguienteCuerda').onclick = avanzarCuerda;
            document.getElementById('reiniciarCuerdas').onclick = reiniciarCuerdas;

            // Modo oscuro
            document.getElementById('modoOscuro').onclick = () => {
                document.body.classList.toggle('dark');
                localStorage.setItem('darkModeGV', document.body.classList.contains('dark'));
            };
            if (localStorage.getItem('darkModeGV') === 'true') {
                document.body.classList.add('dark');
            }

            // Scroll suave
            document.querySelectorAll('a[href^="#"]').forEach(a => {
                a.onclick = (e) => {
                    const target = document.querySelector(a.getAttribute('href'));
                    if (target) { e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' }); }
                };
            });

            // Botón "reiniciar" desde el panel de estado (se crea dinámicamente)
            // Ya está cubierto con el id "reiniciarCuerdas"
        }

        // Exponer funciones globales
        window.mostrarVariantes = mostrarVariantes;
        window.mostrarCategoria = mostrarCategoria;
        window.seleccionarAfinacion = seleccionarAfinacion;
        window.avanzarCuerda = avanzarCuerda;
        window.reiniciarCuerdas = reiniciarCuerdas;

        // Arrancar
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
