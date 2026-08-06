<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guitar Voices · Afinador</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ["Inter", "sans-serif"] },
                },
            },
        };
    </script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: "Inter", sans-serif;
            background: #020617;
            color: #f1f5f9;
            overflow-x: hidden;
        }

        #intro {
            position: fixed;
            inset: 0;
            background: #020617;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: introOut 3.8s forwards;
        }
        #intro h1 {
            font-size: clamp(3rem, 12vw, 5rem);
            font-weight: 900;
            letter-spacing: 6px;
            background: linear-gradient(90deg, #38bdf8, #818cf8, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: logoPulse 2s ease-in-out infinite;
        }
        @keyframes logoPulse {
            0%,
            100% {
                transform: scale(1);
                filter: drop-shadow(0 0 10px #60a5fa);
            }
            50% {
                transform: scale(1.06);
                filter: drop-shadow(0 0 35px #818cf8);
            }
        }
        @keyframes introOut {
            0%,
            80% {
                opacity: 1;
                visibility: visible;
            }
            100% {
                opacity: 0;
                visibility: hidden;
            }
        }

        .heroGlow {
            position: absolute;
            width: 700px;
            height: 700px;
            border-radius: 999px;
            background: #4338ca44;
            filter: blur(180px);
            pointer-events: none;
        }

        .tarjeta {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .tarjeta:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.6);
        }

        .valvula {
            width: 2rem;
            height: 2rem;
            border-radius: 999px;
            background: #1e293b;
            border: 2px solid #334155;
            transition: all 0.2s ease;
        }
        .valvula.activa {
            background: #22c55e;
            box-shadow: 0 0 24px #22c55eaa;
            transform: scale(1.25);
        }
        .valvula.media {
            background: #facc15;
            box-shadow: 0 0 14px #facc1588;
        }
        .valvula.lejos {
            background: #ef4444;
        }

        #nota {
            transition: color 0.25s ease;
        }
        #nota.afinada {
            color: #22c55e;
            text-shadow: 0 0 30px #22c55e66;
        }

        #indicador {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #94a3b8;
            margin: 0 auto;
            transition: transform 0.1s ease, background 0.2s;
        }
        #indicador.correcto {
            background: #22c55e;
        }
        #indicador.izquierda {
            background: #3b82f6;
        }
        #indicador.derecha {
            background: #f59e0b;
        }

        #nivelSonido {
            height: 100%;
            background: linear-gradient(90deg, #22c55e, #84cc16);
            border-radius: 20px;
            transition: width 0.08s linear;
        }

        .afinacion-card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 1rem;
            padding: 1rem 1.25rem;
            transition: all 0.3s ease;
            cursor: pointer;
            text-align: left;
        }
        .afinacion-card:hover {
            border-color: #818cf8;
            transform: translateY(-3px);
            box-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.5);
        }
        .afinacion-card .nombre {
            font-weight: 700;
            font-size: 1.1rem;
            color: #e2e8f0;
        }
        .afinacion-card .cuerdas {
            color: #94a3b8;
            font-size: 0.85rem;
            margin-top: 4px;
        }
        .afinacion-card .badge {
            display: inline-block;
            font-size: 0.65rem;
            font-weight: 600;
            padding: 2px 10px;
            border-radius: 999px;
            margin-top: 6px;
            background: #334155;
            color: #94a3b8;
        }

        .cat-btn {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .cat-btn.active {
            background: #4f46e5 !important;
            border-color: #4f46e5 !important;
        }

        .tono-btn {
            transition: all 0.2s ease;
            cursor: pointer;
        }
        .tono-btn:hover {
            background: #475569 !important;
        }
        .tono-btn.active {
            background: #4f46e5 !important;
            color: white !important;
        }

        @media (max-width: 640px) {
            .valvula {
                width: 1.4rem;
                height: 1.4rem;
            }
            #intro h1 {
                font-size: 2.8rem;
            }
        }
    </style>
</head>
<body>

    <!-- INTRO -->
    <div id="intro"><h1>Guitar Voices</h1></div>

    <!-- NAV -->
    <nav class="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
        <div class="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-2xl">🎸</div>
                <h2 class="text-xl md:text-2xl font-black">Guitar Voices</h2>
            </div>
            <div class="flex gap-4 md:gap-8 font-semibold text-sm md:text-base">
                <a href="#">Inicio</a>
                <a href="#biblioteca">Biblioteca</a>
                <a href="#afinador">Afinador</a>
                <a href="#redes">Redes</a>
            </div>
        </div>
    </nav>

    <!-- HERO -->
    <header class="relative overflow-hidden py-20 md:py-28">
        <div class="heroGlow top-0 left-1/2 -translate-x-1/2"></div>
        <div class="relative z-10 max-w-6xl mx-auto text-center px-6">
            <div class="inline-flex px-6 py-2 rounded-full bg-slate-800 border border-slate-700 mb-8 text-sm md:text-base">Afinaciones Profesionales</div>
            <h1 class="text-5xl md:text-8xl font-black leading-tight">
                La Biblioteca<br />
                <span class="text-indigo-400">Más Completa</span>
            </h1>
            <p class="text-slate-300 text-lg md:text-xl mt-6 max-w-3xl mx-auto">
                Miles de afinaciones abiertas, standard y drop junto con un afinador cromático profesional de alta precisión.
            </p>
            <div class="flex flex-wrap justify-center gap-4 mt-10">
                <a href="#biblioteca" class="bg-indigo-600 px-8 md:px-10 py-4 rounded-2xl font-bold hover:scale-105 duration-300">Explorar Afinaciones</a>
                <a href="#afinador" class="bg-slate-800 border border-slate-700 px-8 md:px-10 py-4 rounded-2xl font-bold hover:scale-105 duration-300">Ir al Afinador</a>
            </div>
        </div>
    </header>

    <!-- BIBLIOTECA -->
    <section id="biblioteca" class="max-w-7xl mx-auto py-16 md:py-24 px-6">
        <div class="text-center mb-12">
            <h2 class="text-4xl md:text-6xl font-black">Biblioteca</h2>
            <p class="text-slate-400 mt-3 text-lg md:text-xl">Elegí una categoría para comenzar.</p>
        </div>

        <div id="categorias" class="flex flex-wrap justify-center gap-4">
            <button data-categoria="abiertas" class="cat-btn bg-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold">Afinaciones Abiertas</button>
            <button data-categoria="standard" class="cat-btn bg-slate-800 border border-slate-700 px-6 md:px-8 py-3 md:py-4 rounded-2xl">Standard</button>
            <button data-categoria="drop" class="cat-btn bg-slate-800 border border-slate-700 px-6 md:px-8 py-3 md:py-4 rounded-2xl">Drop</button>
            <button data-categoria="otras" class="cat-btn bg-slate-800 border border-slate-700 px-6 md:px-8 py-3 md:py-4 rounded-2xl">Otras</button>
        </div>

        <div id="tonalidades" class="flex flex-wrap justify-center gap-3 mt-10"></div>
        <div id="variantes" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"></div>

        <div id="afinacionElegida" class="mt-12 bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 class="text-2xl md:text-3xl font-black text-white">Elegí una afinación</h3>
                    <p id="afinacionDisplay" class="mt-2 text-slate-300 text-base md:text-lg">Seleccioná una afinación para comenzar.</p>
                </div>
                <div class="text-right">
                    <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold text-sm">🎸 Afinación seleccionada</span>
                </div>
            </div>
        </div>
    </section>

    <!-- AFINADOR -->
    <section id="afinador" class="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div class="max-w-5xl mx-auto px-6">
            <div class="text-center">
                <h2 class="text-4xl md:text-6xl font-black">Afinador Profesional</h2>
                <p class="text-slate-400 mt-3 text-lg md:text-xl">Alta precisión · Indicador visual · Sonido de confirmación</p>
            </div>

            <div class="mt-10 md:mt-16 bg-slate-900 border border-slate-700 rounded-[40px] p-6 md:p-10 shadow-2xl">
                <div class="flex justify-center">
                    <div id="nota" class="text-7xl md:text-8xl font-black text-indigo-400 tracking-wider">--</div>
                </div>
                <div id="frecuencia" class="text-center text-xl md:text-2xl text-slate-300 mt-4">Esperando sonido...</div>
                <div id="cent" class="text-center text-base md:text-lg text-slate-500 mt-1">0 cents</div>
                <div id="objetivo" class="text-center text-lg md:text-xl text-emerald-400 mt-4 font-semibold">Seleccioná una afinación</div>

                <div class="mt-10">
                    <div class="flex justify-center items-end gap-1 md:gap-2">
                        <div id="v1" class="valvula"></div>
                        <div id="v2" class="valvula"></div>
                        <div id="v3" class="valvula"></div>
                        <div id="v4" class="valvula"></div>
                        <div id="v5" class="valvula"></div>
                        <div id="v6" class="valvula"></div>
                        <div id="v7" class="valvula"></div>
                        <div id="v8" class="valvula"></div>
                        <div id="v9" class="valvula"></div>
                    </div>
                    <div id="indicador" class="mt-4"></div>
                    <div class="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div id="nivelSonido" style="width:0%"></div>
                    </div>
                </div>

                <div class="mt-10 flex flex-col items-center gap-4">
                    <button id="iniciar" class="px-10 md:px-12 py-4 md:py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition text-lg md:text-xl font-bold shadow-xl">🎤 Iniciar Afinador</button>
                    <div class="text-sm text-slate-500">Permití el acceso al micrófono cuando el navegador lo solicite.</div>
                </div>

                <div id="estadoExtra" class="mt-6 text-center text-sm text-slate-400"></div>
            </div>
        </div>
    </section>

    <!-- REDES -->
    <section id="redes" class="py-16 md:py-24 bg-slate-950">
        <div class="max-w-6xl mx-auto px-6 text-center">
            <h2 class="text-4xl md:text-5xl font-black">Seguinos</h2>
            <p class="mt-3 text-slate-400 text-lg md:text-xl">Encontranos en todas nuestras redes.</p>
            <div class="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="tarjeta bg-red-600 rounded-3xl p-6 md:p-8 shadow-xl">
                    <div class="text-5xl md:text-6xl mb-4">▶️</div>
                    <h3 class="text-2xl md:text-3xl font-black">YouTube</h3>
                    <p class="mt-3 text-red-100">Videos, afinaciones y tutoriales.</p>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="tarjeta bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-500 rounded-3xl p-6 md:p-8 shadow-xl">
                    <div class="text-5xl md:text-6xl mb-4">📷</div>
                    <h3 class="text-2xl md:text-3xl font-black">Instagram</h3>
                    <p class="mt-3 text-pink-100">Fotos, reels y novedades.</p>
                </a>
                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" class="tarjeta bg-black border border-slate-700 rounded-3xl p-6 md:p-8 shadow-xl">
                    <div class="text-5xl md:text-6xl mb-4">🎵</div>
                    <h3 class="text-2xl md:text-3xl font-black">TikTok</h3>
                    <p class="mt-3 text-slate-300">Shorts y demostraciones.</p>
                </a>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-slate-800 bg-slate-950 py-8 md:py-10">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h2 class="text-xl md:text-2xl font-black">🎸 Guitar Voices</h2>
                <p class="text-slate-500 text-sm mt-1">© 2026 Todos los derechos reservados.</p>
            </div>
            <div class="flex gap-6 text-sm">
                <a href="#" class="hover:text-indigo-400 transition">Privacidad</a>
                <a href="#" class="hover:text-indigo-400 transition">Términos</a>
                <a href="#" class="hover:text-indigo-400 transition">Contacto</a>
            </div>
        </div>
    </footer>

    <audio id="ping" preload="auto"></audio>

    <!-- ============================================================ -->
    <!-- JAVASCRIPT - TODAS LAS FUNCIONES GLOBALES                    -->
    <!-- ============================================================ -->
    <script>
        // ---- FUNCIÓN PARA GENERAR TODAS LAS DERIVACIONES DE UNA NOTA ----
        function generarDerivaciones(nota) {
            const base = nota;
            // Mapeo de grados a cuerdas para 6 cuerdas (acordes abiertos)
            const cuerdasBase = {
                'C': ['C', 'E', 'G', 'C', 'E', 'G'],
                'C#': ['C#', 'F', 'G#', 'C#', 'F', 'G#'],
                'D': ['D', 'F#', 'A', 'D', 'F#', 'A'],
                'D#': ['D#', 'G', 'A#', 'D#', 'G', 'A#'],
                'E': ['E', 'G#', 'B', 'E', 'G#', 'B'],
                'F': ['F', 'A', 'C', 'F', 'A', 'C'],
                'F#': ['F#', 'A#', 'C#', 'F#', 'A#', 'C#'],
                'G': ['G', 'B', 'D', 'G', 'B', 'D'],
                'G#': ['G#', 'C', 'D#', 'G#', 'C', 'D#'],
                'A': ['A', 'C#', 'E', 'A', 'C#', 'E'],
                'A#': ['A#', 'D', 'F', 'A#', 'D', 'F'],
                'B': ['B', 'D#', 'F#', 'B', 'D#', 'F#']
            };

            const baseCuerdas = cuerdasBase[base] || ['C', 'E', 'G', 'C', 'E', 'G'];

            // Función para modificar cuerdas según el acorde
            function modificarCuerdas(modificaciones) {
                const nuevas = [...baseCuerdas];
                const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                modificaciones.forEach(([cuerda, nuevaNota]) => {
                    if (cuerda >= 0 && cuerda < 6) {
                        nuevas[cuerda] = nuevaNota;
                    }
                });
                return nuevas;
            }

            // Definir todas las variantes
            const variantes = [];

            // Mayor
            variantes.push({ nombre: `${base} Major`, cuerdas: baseCuerdas });

            // Menor (b3 en cada cuerda que tenga 3ra)
            const menor = baseCuerdas.map(n => {
                if (n === base) return n;
                const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                if (n === base || n === (base + '#') || n === (base + 'b')) return n;
                // Simplificamos: para las cuerdas que no son la fundamental, bajamos medio tono si es 3ra
                return n;
            });
            variantes.push({ nombre: `${base} Minor`, cuerdas: menor });

            // 7 (b7)
            const septima = baseCuerdas.map((n, i) => {
                if (i === 2 || i === 5) { // cuerdas que suelen ser la 5ta o 3ra
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 10) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}7`, cuerdas: septima });

            // Maj7
            const maj7 = baseCuerdas.map((n, i) => {
                if (i === 2 || i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 11) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}Maj7`, cuerdas: maj7 });

            // m7
            const m7 = menor.map((n, i) => {
                if (i === 2 || i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 10) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}m7`, cuerdas: m7 });

            // 6
            const seis = baseCuerdas.map((n, i) => {
                if (i === 2 || i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 9) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}6`, cuerdas: seis });

            // m6
            const m6 = menor.map((n, i) => {
                if (i === 2 || i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 9) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}m6`, cuerdas: m6 });

            // Sus2
            const sus2 = baseCuerdas.map((n, i) => {
                if (i === 1 || i === 3) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 2) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}Sus2`, cuerdas: sus2 });

            // Sus4
            const sus4 = baseCuerdas.map((n, i) => {
                if (i === 1 || i === 3) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 5) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}Sus4`, cuerdas: sus4 });

            // Aug (5#)
            const aug = baseCuerdas.map((n, i) => {
                if (i === 2 || i === 4) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 8) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}Aug`, cuerdas: aug });

            // Dim (b3, b5)
            const dim = baseCuerdas.map((n, i) => {
                if (i === 1 || i === 3) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 3) % 12];
                        return nueva;
                    }
                }
                if (i === 2 || i === 4) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 6) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}Dim`, cuerdas: dim });

            // 7sus4
            const sieteSus4 = sus4.map((n, i) => {
                if (i === 2 || i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 10) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}7sus4`, cuerdas: sieteSus4 });

            // 7sus2
            const sieteSus2 = sus2.map((n, i) => {
                if (i === 2 || i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 10) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}7sus2`, cuerdas: sieteSus2 });

            // add9
            const add9 = baseCuerdas.map((n, i) => {
                if (i === 1) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 2) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}add9`, cuerdas: add9 });

            // madd9
            const madd9 = menor.map((n, i) => {
                if (i === 1) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 2) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}madd9`, cuerdas: madd9 });

            // 9
            const nueve = septima.map((n, i) => {
                if (i === 1) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 2) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}9`, cuerdas: nueve });

            // m9
            const m9 = m7.map((n, i) => {
                if (i === 1) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 2) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}m9`, cuerdas: m9 });

            // Maj9
            const maj9 = maj7.map((n, i) => {
                if (i === 1) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 2) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}Maj9`, cuerdas: maj9 });

            // 11
            const once = nueve.map((n, i) => {
                if (i === 3) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 5) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}11`, cuerdas: once });

            // m11
            const m11 = m9.map((n, i) => {
                if (i === 3) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 5) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}m11`, cuerdas: m11 });

            // 13
            const trece = once.map((n, i) => {
                if (i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 9) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}13`, cuerdas: trece });

            // m13
            const m13 = m11.map((n, i) => {
                if (i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 9) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}m13`, cuerdas: m13 });

            // 6/9
            const seisNueve = seis.map((n, i) => {
                if (i === 1) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 2) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}6/9`, cuerdas: seisNueve });

            // Dim7
            const dim7 = dim.map((n, i) => {
                if (i === 2 || i === 5) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 9) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}Dim7`, cuerdas: dim7 });

            // 7b5
            const sieteB5 = septima.map((n, i) => {
                if (i === 2 || i === 4) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 6) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}7b5`, cuerdas: sieteB5 });

            // 7#5
            const sieteS5 = septima.map((n, i) => {
                if (i === 2 || i === 4) {
                    const idx = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(n);
                    if (idx >= 0) {
                        const nueva = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][(idx + 8) % 12];
                        return nueva;
                    }
                }
                return n;
            });
            variantes.push({ nombre: `${base}7#5`, cuerdas: sieteS5 });

            return variantes;
        }

        // ---- GENERAR TODAS LAS NOTAS CON SUS DERIVACIONES ----
        function generarTodasLasNotas() {
            const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
            const resultado = {};
            notas.forEach(nota => {
                resultado[nota] = generarDerivaciones(nota);
            });
            return resultado;
        }

        // ---- BIBLIOTECA DE AFINACIONES - COMPLETA ----
        const todasLasNotas = generarTodasLasNotas();

        const bibliotecaAfinaciones = {
            abiertas: todasLasNotas,
            standard: {
                "E Standard": [
                    { nombre: "E Standard", cuerdas: ["E", "A", "D", "G", "B", "E"] },
                ],
                "D Standard": [
                    { nombre: "D Standard", cuerdas: ["D", "G", "C", "F", "A", "D"] },
                ],
                "C Standard": [
                    { nombre: "C Standard", cuerdas: ["C", "F", "Bb", "Eb", "G", "C"] },
                ],
                "B Standard": [
                    { nombre: "B Standard", cuerdas: ["B", "E", "A", "D", "F#", "B"] },
                ],
                "A Standard": [
                    { nombre: "A Standard", cuerdas: ["A", "D", "G", "C", "E", "A"] },
                ],
                "G Standard": [
                    { nombre: "G Standard", cuerdas: ["G", "C", "F", "Bb", "D", "G"] },
                ],
                "F Standard": [
                    { nombre: "F Standard", cuerdas: ["F", "Bb", "Eb", "Ab", "C", "F"] },
                ],
            },
            drop: {
                "Drop D": [
                    { nombre: "Drop D", cuerdas: ["D", "A", "D", "G", "B", "E"] },
                ],
                "Drop C": [
                    { nombre: "Drop C", cuerdas: ["C", "G", "C", "F", "A", "D"] },
                ],
                "Drop B": [
                    { nombre: "Drop B", cuerdas: ["B", "F#", "B", "E", "G#", "C#"] },
                ],
                "Drop A": [
                    { nombre: "Drop A", cuerdas: ["A", "E", "A", "D", "F#", "B"] },
                ],
                "Drop G": [
                    { nombre: "Drop G", cuerdas: ["G", "D", "G", "C", "E", "A"] },
                ],
                "Drop F": [
                    { nombre: "Drop F", cuerdas: ["F", "C", "F", "Bb", "D", "G"] },
                ],
                "Drop E": [
                    { nombre: "Drop E", cuerdas: ["E", "B", "E", "A", "C#", "F#"] },
                ],
            },
            otras: {
                "DADGAD": [
                    { nombre: "DADGAD", cuerdas: ["D", "A", "D", "G", "A", "D"] },
                ],
                "DADF#AD": [
                    { nombre: "DADF#AD", cuerdas: ["D", "A", "D", "F#", "A", "D"] },
                ],
                "DGDGBD": [
                    { nombre: "DGDGBD", cuerdas: ["D", "G", "D", "G", "B", "D"] },
                ],
                "CGDGBD": [
                    { nombre: "CGDGBD", cuerdas: ["C", "G", "D", "G", "B", "D"] },
                ],
                "CGCGCE": [
                    { nombre: "CGCGCE", cuerdas: ["C", "G", "C", "G", "C", "E"] },
                ],
                "Open G (Slide)": [
                    { nombre: "Open G Slide", cuerdas: ["D", "G", "D", "G", "B", "D"] },
                ],
                "Open D (Slide)": [
                    { nombre: "Open D Slide", cuerdas: ["D", "A", "D", "F#", "A", "D"] },
                ],
                "Modal D": [
                    { nombre: "Modal D", cuerdas: ["D", "A", "D", "G", "A", "D"] },
                ],
                "Modal G": [
                    { nombre: "Modal G", cuerdas: ["D", "G", "D", "G", "A", "D"] },
                ],
            }
        };

        // ---- DOM REFS ----
        function $(id) { return document.getElementById(id); }

        const dom = {
            variantes: $("variantes"),
            tonalidades: $("tonalidades"),
            afinacionDisplay: $("afinacionDisplay"),
            objetivo: $("objetivo"),
            nota: $("nota"),
            frecuencia: $("frecuencia"),
            cent: $("cent"),
            iniciar: $("iniciar"),
            ping: $("ping"),
            estadoExtra: $("estadoExtra"),
            indicador: $("indicador"),
            nivelSonido: $("nivelSonido"),
        };

        // ---- ESTADO GLOBAL ----
        let afinacionActual = null;
        let cuerdaActual = 0;
        let audioContext = null;
        let analyser = null;
        let buffer = null;
        let detectando = false;
        let ultimoPing = 0;
        let categoriaActual = 'abiertas';

        // ============================================================
        // FUNCIONES
        // ============================================================

        function mostrarVariantes(tipo, nota) {
            dom.variantes.innerHTML = "";
            const lista = bibliotecaAfinaciones[tipo]?.[nota] || [];
            if (lista.length === 0) {
                dom.variantes.innerHTML =
                    `<p class="text-slate-400 text-center col-span-3">No hay afinaciones disponibles para esta tonalidad.</p>`;
                return;
            }
            lista.forEach((af) => {
                const div = document.createElement("div");
                div.className = "afinacion-card";
                div.innerHTML = `
                        <div class="nombre">${af.nombre}</div>
                        <div class="cuerdas">${af.cuerdas.join(" • ")}</div>
                        <span class="badge">${af.cuerdas.length} cuerdas</span>
                    `;
                div.addEventListener('click', function() {
                    seleccionarAfinacion(af);
                    document.getElementById("afinador").scrollIntoView({ behavior: "smooth", block: "center" });
                });
                dom.variantes.appendChild(div);
            });

            // Resaltar tonalidad activa
            document.querySelectorAll('.tono-btn').forEach(b => {
                b.classList.toggle('active', b.textContent === nota);
            });
        }

        function mostrarCategoria(cat) {
            categoriaActual = cat;

            // Resaltar categoría
            document.querySelectorAll(".cat-btn").forEach((b) => {
                const isActive = b.dataset.categoria === cat;
                b.classList.toggle("active", isActive);
                b.classList.toggle("bg-slate-800", !isActive);
                b.classList.toggle("border", !isActive);
                b.classList.toggle("border-slate-700", !isActive);
            });

            const keys = Object.keys(bibliotecaAfinaciones[cat] || {});
            dom.tonalidades.innerHTML = "";
            if (keys.length === 0) {
                dom.tonalidades.innerHTML = `<p class="text-slate-400">No hay tonalidades disponibles.</p>`;
                dom.variantes.innerHTML = "";
                return;
            }

            // Crear botones de tonalidad
            keys.forEach((key) => {
                const btn = document.createElement("button");
                btn.className =
                    "tono-btn px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition font-semibold text-sm";
                btn.textContent = key;
                btn.addEventListener('click', function() {
                    mostrarVariantes(cat, key);
                });
                dom.tonalidades.appendChild(btn);
            });

            // Mostrar la primera tonalidad
            if (keys.length) {
                // Activar el primer botón
                const firstBtn = dom.tonalidades.querySelector('.tono-btn');
                if (firstBtn) firstBtn.classList.add('active');
                mostrarVariantes(cat, keys[0]);
            }
        }

        function seleccionarAfinacion(af) {
            afinacionActual = af;
            cuerdaActual = 0;
            dom.afinacionDisplay.innerHTML = `
                    <span class="text-emerald-400 font-bold">${af.nombre}</span>
                    <span class="text-slate-300 ml-2">${af.cuerdas.join(" - ")}</span>
                `;
            actualizarObjetivo();
            guardarUltimaAfinacion();
        }

        // ---- FUNCIONES INTERNAS ----
        function actualizarObjetivo() {
            if (!afinacionActual) {
                dom.objetivo.textContent = "Seleccioná una afinación";
                return;
            }
            const nota = afinacionActual.cuerdas[cuerdaActual] || "--";
            const num = 6 - cuerdaActual;
            dom.objetivo.innerHTML = `Cuerda ${num}ª → <strong class="text-emerald-300">${nota}</strong>`;
        }

        function avanzarCuerda() {
            if (!afinacionActual) return;
            cuerdaActual = (cuerdaActual + 1) % afinacionActual.cuerdas.length;
            actualizarObjetivo();
            if (dom.estadoExtra) dom.estadoExtra.textContent = `Cuerda ${6 - cuerdaActual}ª`;
        }

        function guardarUltimaAfinacion() {
            if (afinacionActual) {
                localStorage.setItem("ultimaAfinacionGV", JSON.stringify(afinacionActual));
            }
        }

        function cargarUltimaAfinacion() {
            try {
                const data = localStorage.getItem("ultimaAfinacionGV");
                if (data) {
                    const af = JSON.parse(data);
                    if (af?.nombre && af?.cuerdas) {
                        seleccionarAfinacion(af);
                        return true;
                    }
                }
            } catch (_) { /* ignore */ }
            return false;
        }

        // ---- DETECCIÓN DE FRECUENCIA ----
        function encontrarFrecuencia(buffer, sampleRate) {
            let mejorOffset = -1,
                mejorValor = 0;
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
                completa: notas[midi % 12] + (Math.floor(midi / 12) - 1),
            };
        }

        function calcularCents(frecuencia) {
            const midi = 12 * Math.log2(frecuencia / 440) + 69;
            const redondeada = Math.round(midi);
            const freqCorrecta = 440 * Math.pow(2, (redondeada - 69) / 12);
            return { cents: Math.round(1200 * Math.log2(frecuencia / freqCorrecta)) };
        }

        // ---- VÁLVULAS ----
        function moverValvulas(cents) {
            const valvulas = document.querySelectorAll(".valvula");
            valvulas.forEach((v) => (v.className = "valvula"));
            let pos = Math.round(((cents + 50) / 100) * 8);
            pos = Math.max(0, Math.min(8, pos));
            const v = valvulas[pos];
            if (v) {
                if (Math.abs(cents) <= 5) v.classList.add("activa");
                else if (Math.abs(cents) <= 20) v.classList.add("media");
                else v.classList.add("lejos");
            }
            if (dom.indicador) {
                dom.indicador.style.transform = `translateX(${Math.max(-40, Math.min(40, cents * 1.5))}px)`;
                dom.indicador.className = "";
                if (Math.abs(cents) <= 5) dom.indicador.classList.add("correcto");
                else if (cents < 0) dom.indicador.classList.add("izquierda");
                else dom.indicador.classList.add("derecha");
            }
        }

        // ---- LOOP DE AFINACIÓN ----
        function iniciarAfinador() {
            if (detectando) {
                if (audioContext) audioContext.close();
                audioContext = null;
                analyser = null;
                detectando = false;
                dom.iniciar.textContent = "🎤 Iniciar Afinador";
                if (dom.estadoExtra) dom.estadoExtra.textContent = "Detenido";
                return;
            }
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    audioContext = new(window.AudioContext || window.webkitAudioContext)();
                    const source = audioContext.createMediaStreamSource(stream);
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 4096;
                    source.connect(analyser);
                    buffer = new Float32Array(analyser.fftSize);
                    detectando = true;
                    dom.iniciar.textContent = "⏹ Detener";
                    if (dom.estadoExtra) dom.estadoExtra.textContent = "Escuchando...";
                    loopDetectar();
                })
                .catch(() => {
                    if (dom.estadoExtra) dom.estadoExtra.textContent = "❌ No se pudo acceder al micrófono";
                });
        }

        function loopDetectar() {
            if (!detectando || !analyser) return;
            requestAnimationFrame(loopDetectar);
            analyser.getFloatTimeDomainData(buffer);
            const freq = encontrarFrecuencia(buffer, audioContext.sampleRate);
            if (!freq) return;

            const info = convertirNotaCompleta(freq);
            const { cents } = calcularCents(freq);

            if (dom.nota) dom.nota.textContent = info.completa;
            if (dom.frecuencia) dom.frecuencia.textContent = freq.toFixed(2) + " Hz";
            if (dom.cent) dom.cent.textContent = cents + " cents";

            let suma = 0;
            for (let i = 0; i < buffer.length; i++) suma += buffer[i] * buffer[i];
            const rms = Math.sqrt(suma / buffer.length);
            if (dom.nivelSonido) dom.nivelSonido.style.width = Math.min(rms * 200, 100) + "%";

            moverValvulas(cents);
            comprobarAfinacion(info.nota, cents);
        }

        function comprobarAfinacion(nota, cents) {
            if (!afinacionActual) return;
            const objetivo = afinacionActual.cuerdas[cuerdaActual] || "";
            if (nota === objetivo && Math.abs(cents) <= 5) {
                if (dom.nota) dom.nota.classList.add("afinada");
                if (dom.estadoExtra) dom.estadoExtra.innerHTML = "✅ Afinación perfecta";
                reproducirPing();
                if (!dom.estadoExtra?.dataset?.avanzado) {
                    if (dom.estadoExtra) dom.estadoExtra.dataset.avanzado = "true";
                    setTimeout(() => {
                        avanzarCuerda();
                        if (dom.estadoExtra) dom.estadoExtra.dataset.avanzado = "";
                    }, 800);
                }
            } else {
                if (dom.nota) dom.nota.classList.remove("afinada");
                if (dom.estadoExtra && nota) {
                    dom.estadoExtra.innerHTML = `🎯 ${nota} · ${Math.abs(cents)} cents`;
                }
            }
        }

        function reproducirPing() {
            const ahora = Date.now();
            if (ahora - ultimoPing < 1500) return;
            ultimoPing = ahora;
            try {
                const ctx = new(window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.value = 880;
                gain.gain.value = 0.15;
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } catch (_) { /* fallback */ }
        }

        // ============================================================
        // INICIALIZACIÓN
        // ============================================================
        document.addEventListener("DOMContentLoaded", function() {

            // ---- CONFIGURAR BOTONES DE CATEGORÍA ----
            document.querySelectorAll(".cat-btn").forEach((btn) => {
                btn.addEventListener("click", function() {
                    const categoria = this.dataset.categoria;
                    mostrarCategoria(categoria);
                });
            });

            // ---- BOTÓN INICIAR ----
            if (dom.iniciar) {
                dom.iniciar.addEventListener("click", iniciarAfinador);
            }

            // ---- TECLADO: ESPACIO ----
            document.addEventListener("keydown", (e) => {
                if (e.key === " " && e.target === document.body) {
                    e.preventDefault();
                    iniciarAfinador();
                }
            });

            // ---- SCROLL SUAVE ----
            document.querySelectorAll('a[href^="#"]').forEach((a) => {
                a.addEventListener("click", (e) => {
                    const target = document.querySelector(a.getAttribute("href"));
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: "smooth" });
                    }
                });
            });

            // ---- CARGAR ÚLTIMA AFINACIÓN O MOSTRAR DEFAULT ----
            if (!cargarUltimaAfinacion()) {
                mostrarCategoria("abiertas");
            } else {
                // Buscar la categoría de la afinación cargada
                let encontrada = false;
                for (const cat in bibliotecaAfinaciones) {
                    if (encontrada) break;
                    for (const key in bibliotecaAfinaciones[cat]) {
                        if (bibliotecaAfinaciones[cat][key].some(af => af.nombre === afinacionActual?.nombre)) {
                            mostrarCategoria(cat);
                            encontrada = true;
                            break;
                        }
                    }
                }
                if (!encontrada) mostrarCategoria("abiertas");
            }

            console.log("🎸 Guitar Voices · Listo");
            const totalAbiertas = Object.keys(bibliotecaAfinaciones.abiertas).reduce((acc, key) =>
                acc + bibliotecaAfinaciones.abiertas[key].length, 0);
            console.log(`📚 Total de afinaciones abiertas: ${totalAbiertas}`);
        });
    </script>
</body>
</html>
