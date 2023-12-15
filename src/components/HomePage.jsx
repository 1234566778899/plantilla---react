import React, { useEffect, useState } from 'react'
import '../styles/main.css'
import { useForm } from 'react-hook-form'
export const HomePage = () => {
    const { register, handleSubmit } = useForm();
    const [matriz, setMatriz] = useState([]);
    const [cellSize, setCellSize] = useState(20);
    const [color, setcolor] = useState('1');
    const [isDrop, setIsDrop] = useState(false);
    const [isClean, setisClean] = useState(false);
    const [fila, setfila] = useState(0);
    const [col, setcol] = useState(0);
    const generateMatriz = (data) => {
        let aux = [];
        for (let i = 0; i < fila; i++) {
            let cols = [];
            for (let j = 0; j < col; j++) {
                cols.push(0);
            }
            aux.push(cols);
        }
        setMatriz(aux);
    }
    const pintar = (fil, col) => {
        let aux = [...matriz];
        aux[fil][col] = isClean ? '0' : color;
        setMatriz(aux);
    }
    useEffect(() => {
        document.querySelectorAll('.celda').forEach(cell => {
            cell.style.height = `${cellSize}px`;
            cell.style.flexBasis = `${cellSize}px`;
        });
    }, [cellSize])

    const handleKeyDown = (event) => {
        if (event.key === 'd') {
            setIsDrop(x => (!x));
        }
        if (event.key === 'c') {
            setisClean(x => (!x));
        }
    };
    const getColor = (col) => {
        switch (col) {
            case '1': return 'rojo'; break;
            case '2': return 'azul'; break;
            case '3': return 'verde'; break;
            case '4': return 'amarillo'; break;
            case '5': return 'anaranjado'; break;
            case '6': return 'negro'; break;
            case '7': return 'rosado'; break;
            default: return ''; break;
        }
    }
    const generarCodigo = () => {
        const inp = document.querySelector('#inpResultado');
        inp.value = '{';
        for (let i = 0; i < matriz.length; i++) {
            inp.value += '{'
            for (let j = 0; j < matriz[0].length; j++) {
                inp.value += `${matriz[i][j]}${j == matriz[0].length - 1 ? '' : ','}`;
            }
            inp.value += `${i == matriz.length - 1 ? '}' : '},'}`;
            inp.value += '\n';
        }
        inp.value += '}';
    }
    const copiarPortapapeles = () => {
        const inp = document.querySelector('#inpResultado');
        inp.select();
        navigator.clipboard.writeText(inp.value);
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <>
            <div className="container">
                <br />
                <h3>Generador de mapas</h3>
                <hr />
                <div className="menu">
                    <div>
                        <p>Menú matriz</p>

                        <div className='d-flex'>
                            <div className='me-2'>
                                <label>Color de bloque:</label>
                                <select className='form-select' value={color} onChange={(e) => setcolor(e.target.value)}>
                                    <option value="1">Rojo</option>
                                    <option value="2">Azul</option>
                                    <option value="3">Verde</option>
                                    <option value="4">Amarillo</option>
                                    <option value="5">Anaranjado</option>
                                    <option value="6">Negro</option>
                                    <option value="7">Rosado</option>
                                </select>
                            </div>
                            <div className='ms-1'>
                                <span># Filas</span>
                                <input type="text" className='form-control' onChange={(e) => setfila(e.target.value)} />
                            </div>
                            <div className='ms-1'>
                                <span># Columnas</span>
                                <input type="text" className='form-control' onChange={(e) => setcol(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div className='ms-1'>
                                <input type="checkbox" className='form-check-input' checked={isDrop} onChange={(e) => setIsDrop(e.target.checked)} />
                                <span className='ms-2'>Pintar arrastrando (D)</span>
                            </div>
                            <div className='ms-1'>
                                <input type="checkbox" className='form-check-input' checked={isClean} onChange={(e) => setisClean(e.target.checked)} />
                                <span className='ms-2'>Limpiar (C)</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-2'>
                            <button className='btn btn-dark' onClick={() => generateMatriz()}>Dibujar Matriz</button>
                            <button className='btn btn-dark' onClick={() => generateMatriz()}>Reset</button>
                        </div>
                    </div>
                    <div>
                        Código matriz
                        <textarea className='form-control' id='inpResultado' style={{ height: '140px' }}></textarea>
                        <div className="mt-2 d-flex justify-content-between">
                            <button className='btn btn-dark' onClick={() => generarCodigo()}>Generar código</button>
                            <button className='btn btn-dark' onClick={() => copiarPortapapeles()}>Copiar</button>
                        </div>
                    </div>
                    <div>
                        <p>Dibujar linea</p>
                        <div className="mt-1">
                            <span>Sentido: </span>
                            <select className='form-select'>
                                <option value="">Horizontal</option>
                                <option value="">Vertical</option>
                            </select>
                        </div>
                        <div className='d-flex'>
                            <div className='me-1'>
                                <span>CInicio</span>
                                <input type="text" className='form-control' />
                            </div>
                            <div className='me-1'>
                                <span>CFin</span>
                                <input type="text" className='form-control' />
                            </div>
                            <div className='ms-1'>
                                <span>Fila</span>
                                <input type="text" className='form-control' />
                            </div>
                        </div>
                        <button className='mt-2 btn btn-dark'>Dibujar</button>
                    </div>
                </div>
                <div className="text-end mt-2">
                    <span>Tamaña de la celda: </span>
                    <input type="range" min={10} max={100} value={cellSize} onChange={(e) => setCellSize(e.target.value)} />
                </div>
                <div className='mapa'>
                    {
                        matriz.map((fila, filIndex) => (
                            <div className='fila' key={filIndex}>
                                {
                                    fila.map((columna, colIndex) => (
                                        <div key={`${filIndex}${colIndex}`} onMouseEnter={() => { if (isDrop) pintar(filIndex, colIndex); }}
                                            className={`celda ${getColor(columna)}`}
                                            onClick={() => pintar(filIndex, colIndex)}></div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <br />
        </>
    )
}
