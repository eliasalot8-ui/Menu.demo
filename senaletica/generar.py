#!/usr/bin/env python3
"""Genera los bocetos SVG editables de la señalética de accesos AXION San Guillermo.

Unidad: 1 unidad SVG = 1 mm sobre un panel de referencia de 1500 x 1000 mm.
Las dimensiones finales están pendientes; el diseño se reescala de forma proporcional.

Uso: python3 senaletica/generar.py  (escribe en senaletica/svg/)
"""
from pathlib import Path

OUT = Path(__file__).parent / "svg"

# Colores de referencia digital (no son especificaciones de impresión)
MAGENTA = "#9E1E62"
MAGENTA_OSC = "#7A1549"
AZUL = "#121860"
AZUL_OSC = "#0A0E3F"
BLANCO = "#FFFFFF"
PLATA = "#C9CDD6"
PIEL = "#C58C68"
PIEL_SOMBRA = "#A8704F"
PELO = "#2A1C15"

W, H = 1500, 1000
MARGEN = 50
FUENTE = "'Helvetica Neue', Helvetica, Arial, Inter, sans-serif"

# Orientación de la flecha en grados (0 = hacia arriba/avance, 90 = derecha, -90 = izquierda,
# 45 = diagonal derecha, -45 = diagonal izquierda). PENDIENTE de confirmar en sitio.
FLECHA = {"entrada": 0, "salida": 0}

TEXTOS = {
    "entrada": ("ENTRADA", "Bienvenidos"),
    "salida": ("SALIDA", "Gracias por su visita"),
}


def flecha(cx, cy, escala, color, grados):
    """Flecha de circulación de trazo pleno, editable como capa propia."""
    pts = "0,-150 118,-22 42,-22 42,150 -42,150 -42,-22 -118,-22"
    return (
        f'<g id="flecha" data-orientacion-grados="{grados}" '
        f'transform="translate({cx} {cy}) rotate({grados}) scale({escala})">'
        f'<polygon points="{pts}" fill="{color}"/></g>'
    )


def logo_zona(x, y, w, h, fondo_oscuro=False):
    """Reserva para el logotipo oficial. NO se dibuja un logo: se inserta el vector del manual."""
    borde = BLANCO if fondo_oscuro else "#8A90A3"
    texto = BLANCO if fondo_oscuro else "#5B6178"
    return (
        f'<g id="logo-axion-reserva">'
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="none" stroke="{borde}" '
        f'stroke-width="3" stroke-dasharray="14 10"/>'
        f'<text x="{x + w / 2}" y="{y + h / 2 - 6}" text-anchor="middle" font-family="{FUENTE}" '
        f'font-size="25" font-weight="700" fill="{texto}">LOGO OFICIAL AXION energy</text>'
        f'<text x="{x + w / 2}" y="{y + h / 2 + 30}" text-anchor="middle" font-family="{FUENTE}" '
        f'font-size="18" fill="{texto}">insertar vector del manual de marca</text></g>'
    )


def playero(x, y, escala, gesto):
    """Playero AXION, ilustración vectorial original semirrealista (no es una persona real).

    Sistema local: 480 x 720, la cintura queda cortada por el borde inferior del cartel.
    gesto: 'entrada' (brazo abierto que presenta el acceso) o 'salida' (saludo de despedida).
    """
    if gesto == "entrada":
        brazo = (
            # manga y antebrazo extendidos hacia el mensaje, palma abierta
            f'<path d="M352 352 L420 440" stroke="{MAGENTA}" stroke-width="84" stroke-linecap="round"/>'
            f'<path d="M420 440 L470 400" stroke="{PIEL}" stroke-width="56" stroke-linecap="round"/>'
            f'<path d="M402 470 L440 444" stroke="{PIEL_SOMBRA}" stroke-width="12" stroke-linecap="round" opacity=".5"/>'
            f'<g transform="translate(486 384) rotate(-40)">'
            f'<rect x="-8" y="-28" width="76" height="50" rx="22" fill="{PIEL}"/>'
            f'<rect x="-4" y="-44" width="30" height="20" rx="10" fill="{PIEL}" transform="rotate(-25 10 -34)"/>'
            f'<path d="M30 -16 L64 -16 M30 -2 L66 -2 M30 12 L62 12" stroke="{PIEL_SOMBRA}" '
            f'stroke-width="3" opacity=".55"/></g>'
        )
    else:
        brazo = (
            # brazo en alto, saludo de despedida
            f'<path d="M352 352 L410 300" stroke="{MAGENTA}" stroke-width="84" stroke-linecap="round"/>'
            f'<path d="M410 300 L432 196" stroke="{PIEL}" stroke-width="54" stroke-linecap="round"/>'
            f'<g transform="translate(438 150) rotate(12)">'
            f'<rect x="-30" y="-40" width="60" height="78" rx="26" fill="{PIEL}"/>'
            f'<rect x="-48" y="-6" width="34" height="18" rx="9" fill="{PIEL}" transform="rotate(-30 -30 3)"/>'
            f'<path d="M-14 -36 L-14 -6 M2 -40 L2 -6 M18 -36 L18 -6" stroke="{PIEL_SOMBRA}" '
            f'stroke-width="3" opacity=".55"/></g>'
        )
    cuerpo = (
        # pantalón azul y cinturón
        f'<path d="M108 600 L372 600 L380 740 L100 740 Z" fill="{AZUL}"/>'
        f'<rect x="104" y="596" width="272" height="16" fill="{AZUL_OSC}"/>'
        # brazo izquierdo relajado
        f'<path d="M122 360 L100 500" stroke="{MAGENTA_OSC}" stroke-width="84" stroke-linecap="round"/>'
        f'<path d="M100 500 L110 618" stroke="{PIEL_SOMBRA}" stroke-width="54" stroke-linecap="round"/>'
        # torso, chomba magenta
        f'<path d="M126 330 Q240 304 354 330 Q392 350 392 392 L380 606 L100 606 L90 392 Q90 350 126 330 Z" '
        f'fill="{MAGENTA}"/>'
        f'<path d="M100 606 L92 400 Q96 360 126 336 L150 606 Z" fill="{MAGENTA_OSC}" opacity=".55"/>'
        # cuello
        f'<rect x="210" y="262" width="60" height="62" rx="10" fill="{PIEL_SOMBRA}"/>'
        f'<path d="M206 318 L240 346 L274 318 L294 330 L240 372 L186 330 Z" fill="{AZUL}"/>'
        f'<rect x="234" y="356" width="12" height="74" rx="4" fill="{MAGENTA_OSC}"/>'
        f'<circle cx="240" cy="376" r="4" fill="{BLANCO}"/><circle cx="240" cy="404" r="4" fill="{BLANCO}"/>'
        # identificación: bordado del logo oficial en pecho (reserva) + credencial
        f'<g id="identificacion-axion">'
        f'<rect x="280" y="392" width="76" height="30" rx="4" fill="{BLANCO}"/>'
        f'<rect x="286" y="402" width="64" height="10" rx="2" fill="{PLATA}"/>'
        f'<rect x="138" y="420" width="62" height="40" rx="5" fill="{BLANCO}" stroke="{AZUL}" stroke-width="3"/>'
        f'<rect x="146" y="430" width="46" height="6" fill="{AZUL}"/>'
        f'<rect x="146" y="442" width="30" height="6" fill="{MAGENTA}"/></g>'
        # cabeza
        f'<ellipse cx="166" cy="206" rx="14" ry="22" fill="{PIEL_SOMBRA}"/>'
        f'<ellipse cx="314" cy="206" rx="14" ry="22" fill="{PIEL_SOMBRA}"/>'
        f'<ellipse cx="240" cy="198" rx="72" ry="88" fill="{PIEL}"/>'
        f'<path d="M172 160 Q170 196 178 214 L184 168 Z M308 160 Q310 196 302 214 L296 168 Z" fill="{PELO}"/>'
        # rasgos
        f'<path d="M204 186 Q216 180 228 186 M252 186 Q264 180 276 186" stroke="{PELO}" stroke-width="5" '
        f'fill="none" stroke-linecap="round"/>'
        f'<ellipse cx="216" cy="204" rx="6" ry="7" fill="{PELO}"/>'
        f'<ellipse cx="264" cy="204" rx="6" ry="7" fill="{PELO}"/>'
        f'<path d="M240 210 Q234 230 242 236" stroke="{PIEL_SOMBRA}" stroke-width="4" fill="none" stroke-linecap="round"/>'
        f'<path d="M214 252 Q240 270 266 252" stroke="#7A3B2C" stroke-width="5" fill="none" stroke-linecap="round"/>'
        f'<path d="M168 210 Q174 270 240 286 Q200 262 186 214 Z" fill="{PIEL_SOMBRA}" opacity=".45"/>'
        # gorra institucional azul (frente reservado para el logo bordado)
        f'<path d="M164 168 Q164 92 240 88 Q316 92 316 168 Z" fill="{AZUL}"/>'
        f'<path d="M164 168 Q166 120 200 100 Q182 130 186 168 Z" fill="{AZUL_OSC}"/>'
        f'<path d="M158 164 Q240 150 326 164 L330 178 Q240 168 154 180 Z" fill="{AZUL_OSC}"/>'
        f'<rect x="214" y="118" width="52" height="22" rx="3" fill="{BLANCO}"/>'
        f'<rect x="220" y="125" width="40" height="8" rx="2" fill="{MAGENTA}"/>'
    )
    return (
        f'<g id="playero-{gesto}" transform="translate({x} {y}) scale({escala})">'
        f'{cuerpo}{brazo}</g>'
    )


def guias():
    """Capa de márgenes de seguridad (oculta por defecto)."""
    return (
        f'<g id="guias-margen-seguridad" display="none">'
        f'<rect x="{MARGEN}" y="{MARGEN}" width="{W - 2 * MARGEN}" height="{H - 2 * MARGEN}" '
        f'fill="none" stroke="#00B3FF" stroke-width="2" stroke-dasharray="12 8"/></g>'
    )


def svg(contenido, titulo):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}mm" height="{H}mm">'
        f'<title>{titulo}</title>'
        f'<defs><clipPath id="panel"><rect width="{W}" height="{H}"/></clipPath></defs>'
        f'<g clip-path="url(#panel)">{contenido}</g>{guias()}</svg>\n'
    )


def texto(x, y, s, tam, color, peso=800, esp=2):
    return (
        f'<text x="{x}" y="{y}" text-anchor="middle" font-family="{FUENTE}" font-size="{tam}" '
        f'font-weight="{peso}" letter-spacing="{esp}" fill="{color}">{s}</text>'
    )


def propuesta_a(tipo):
    """A — Institucional minimalista: base blanca, azul dominante, magenta como acento."""
    palabra, sub = TEXTOS[tipo]
    cx = 1030
    c = [
        f'<rect id="fondo" width="{W}" height="{H}" fill="{BLANCO}"/>',
        f'<rect id="banda-magenta" y="884" width="{W}" height="16" fill="{MAGENTA}"/>',
        f'<rect id="banda-azul" y="900" width="{W}" height="100" fill="{AZUL}"/>',
        logo_zona(60, 70, 420, 140),
        f'<rect id="placa-flecha" x="{cx - 200}" y="70" width="400" height="400" rx="36" fill="{AZUL}"/>',
        flecha(cx, 270, 1.05, BLANCO, FLECHA[tipo]),
        f'<g id="indicacion">{texto(cx, 690, palabra, 172, AZUL)}</g>',
        f'<rect id="acento" x="{cx - 60}" y="728" width="120" height="10" fill="{MAGENTA}"/>',
        f'<g id="mensaje-secundario">{texto(cx, 812, sub, 54, MAGENTA, 600, 1)}</g>',
        playero(30, 300, 1.0, tipo),
    ]
    return svg("".join(c), f"Propuesta A · {palabra}")


def propuesta_b(tipo):
    """B — Mayor impacto: fondo magenta, cuña azul dinámica que aloja al playero."""
    palabra, sub = TEXTOS[tipo]
    cx = 1040
    c = [
        f'<rect id="fondo" width="{W}" height="{H}" fill="{MAGENTA}"/>',
        f'<polygon id="cuna-azul" points="0,0 540,0 420,1000 0,1000" fill="{AZUL}"/>',
        f'<polygon id="filete-blanco" points="556,0 574,0 454,1000 436,1000" fill="{BLANCO}"/>',
        f'<rect id="placa-logo" x="50" y="60" width="430" height="150" rx="10" fill="{BLANCO}"/>',
        logo_zona(65, 75, 400, 120),
        f'<circle id="placa-flecha" cx="{cx}" cy="285" r="210" fill="{BLANCO}"/>',
        flecha(cx, 285, 1.08, AZUL, FLECHA[tipo]),
        f'<g id="indicacion">{texto(cx, 700, palabra, 172, BLANCO)}</g>',
        f'<rect id="acento" x="{cx - 60}" y="738" width="120" height="10" fill="{BLANCO}"/>',
        f'<g id="mensaje-secundario">{texto(cx, 822, sub, 54, BLANCO, 600, 1)}</g>',
        playero(20, 300, 1.0, tipo),
    ]
    return svg("".join(c), f"Propuesta B · {palabra}")


def lamina_flechas():
    """Opciones de orientación de flecha para validar en sitio."""
    ops = [(0, "Avance"), (-45, "Diagonal izq."), (45, "Diagonal der."), (-90, "Izquierda"), (90, "Derecha")]
    c = [f'<rect width="1500" height="420" fill="{BLANCO}"/>',
         texto(750, 70, "Orientación de flecha — a confirmar por acceso y cara", 40, AZUL, 700, 0)]
    for i, (g, n) in enumerate(ops):
        x = 170 + i * 290
        c.append(f'<rect x="{x - 110}" y="120" width="220" height="220" rx="24" fill="{AZUL}"/>')
        c.append(flecha(x, 230, 0.6, BLANCO, g).replace('id="flecha"', f'id="flecha-{g}"'))
        c.append(texto(x, 390, n, 30, AZUL, 600, 0))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 420">'
            f'<title>Opciones de flecha</title>{"".join(c)}</svg>\n')


def plano_ubicacion():
    """Esquema genérico (no a escala) de 2 accesos x 2 posiciones x 2 caras."""
    c = [f'<rect width="1500" height="820" fill="{BLANCO}"/>',
         texto(750, 60, "Esquema de posiciones — NO a escala, sentidos pendientes", 38, AZUL, 700, 0),
         f'<rect x="0" y="620" width="1500" height="140" fill="#3B3F4A"/>',
         f'<line x1="0" y1="690" x2="1500" y2="690" stroke="{BLANCO}" stroke-width="5" stroke-dasharray="40 30"/>',
         texto(750, 800, "RUTA PROVINCIAL 23", 30, "#3B3F4A", 700, 4),
         f'<rect x="120" y="110" width="1260" height="370" rx="12" fill="#EEF0F4" stroke="{PLATA}" stroke-width="3"/>',
         texto(750, 300, "PLAYA / ESTACIÓN AXION", 36, "#8A90A3", 700, 2)]
    accesos = [(400, "ACCESO IMG. 2 (izquierda)", "P3", "P4"), (1100, "ACCESO IMG. 1 (derecha)", "P1", "P2")]
    for x, nombre, pa, pb in accesos:
        c.append(f'<rect x="{x - 130}" y="480" width="260" height="140" fill="#6B7080"/>')
        c.append(texto(x, 470 - 10, nombre, 24, AZUL, 700, 0))
        c.append(texto(x, 560, "?  sentido  ?", 26, BLANCO, 700, 0))
        for px, et in ((x - 165, pa), (x + 165, pb)):
            c.append(f'<rect x="{px - 30}" y="520" width="60" height="70" rx="6" fill="{BLANCO}" stroke="#D02030" stroke-width="5"/>')
            c.append(f'<rect x="{px - 34}" y="538" width="68" height="14" fill="{MAGENTA}"/>')
            c.append(texto(px, 586, et, 22, AZUL, 800, 0))
    c.append(texto(750, 400, "Cada posición: cara a ruta + cara a playa", 24, "#5B6178", 600, 0))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 820">'
            f'<title>Esquema de posiciones</title>{"".join(c)}</svg>\n')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for tipo in ("entrada", "salida"):
        (OUT / f"A-minimalista-{tipo}.svg").write_text(propuesta_a(tipo), encoding="utf-8")
        (OUT / f"B-impacto-{tipo}.svg").write_text(propuesta_b(tipo), encoding="utf-8")
    (OUT / "opciones-flecha.svg").write_text(lamina_flechas(), encoding="utf-8")
    (OUT / "esquema-posiciones.svg").write_text(plano_ubicacion(), encoding="utf-8")


if __name__ == "__main__":
    main()
