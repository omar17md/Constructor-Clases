const infoClase = document.querySelector('#form-info');
const encabezados = document.querySelector('#encabezados');
const tabla = document.querySelector('#box-elementos');
const numeroRenglones = document.querySelector('#numero');
const nombreClase = document.querySelector('#clase');
const continuar = document.querySelector('#btnContinuar');
const opciones = document.querySelector('#box-opciones');

infoClase.addEventListener('submit', (e) => {
    e.preventDefault(); 

    continuar.setAttribute("hidden", ''); 
    AgregarEncabezados();
    AgregarRenglones(Number(numeroRenglones.value));
    AgregarOpciones();


});

function AgregarEncabezados(){
    const titulos = document.createElement('div');
    titulos.classList.add('row', 'row-cols-4', 'text-center', 'title');
    titulos.innerHTML =
    `
        <div class="col">
        <h4>Acceso</h4>
        </div>
        <div class="col">
            <h4>Tipo de dato</h4>
        </div>
        <div class="col">
            <h4>Nombre de atributo</h4>
        </div>
        <div class="col">
        <h4>Valor por Default</h4>
        </div>
    `;
           
    encabezados.appendChild(titulos);
}

function AgregarRenglones(num){
    for (let i = 0; i < num; i++) {
        const row = document.createElement('div');
        row.classList.add('row', 'row-cols-4', 'text-center', 'mt-2', 'elemento');
        row.innerHTML =
        `
            <div class="col">
            <select class="form-select" id="${'select1-'+i}" aria-label="Default select example">
                <option value="private" selected>private</option>
                <option value="public">public</option>
                <option value="protected">protected</option>
                <option value="internal">internal</option>
            </select>
            </div>
            <div class="col">
                <select class="form-select" id="${'select2-'+i}" aria-label="Default select example" onchange="CambioTipoDato('${'select2-'+i}', '${'default-'+i}');")>
                    <option value="string" selected>string</option>
                    <option value="int">int</option>
                    <option value="bool">bool</option>
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="double">double</option>
                    <option value="byte">byte</option>
                    <option value="long">long</option>
                    <option value="decimal">decimal</option>
                    <option value="DateTime">DateTime</option>
                    <option value="CheckState">CheckState</option>
                    <option value="StringBuilder">StringBuilder</option>
                </select>
            </div>
            <div class="col">
                <input type="text" name="NombreAtributo" id="${'atributo-'+i}">
            </div>
            <div class="col">
                <input type="text" name="Default" id="${'default-'+i}" value="string.empty">
            </div>
        `;

        tabla.appendChild(row);
    }     
}

function AgregarRenglon(){
    let i = numeroRenglones.value + 1;
    numeroRenglones.value++;

    const row = document.createElement('div');
        row.classList.add('row', 'row-cols-4', 'text-center', 'mt-2', 'elemento');
        row.innerHTML =
        `
            <div class="col">
            <select class="form-select" id="${'select1-'+i}" aria-label="Default select example">
                <option value="private" selected>private</option>
                <option value="public">public</option>
                <option value="protected">protected</option>
                <option value="internal">internal</option>
            </select>
            </div>
            <div class="col">
                <select class="form-select" id="${'select2-'+i}" aria-label="Default select example" onchange="CambioTipoDato('${'select2-'+i}', '${'default-'+i}');")>
                    <option value="string" selected>string</option>
                    <option value="int">int</option>
                    <option value="bool">bool</option>
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="double">double</option>
                    <option value="byte">byte</option>
                    <option value="long">long</option>
                    <option value="decimal">decimal</option>
                    <option value="DateTime">DateTime</option>
                    <option value="CheckState">CheckState</option>
                    <option value="StringBuilder">StringBuilder</option>
                </select>
            </div>
            <div class="col">
                <input type="text" name="NombreAtributo" id="${'atributo-'+i}">
            </div>
            <div class="col">
                <input type="text" name="Default" id="${'default-'+i}" value="string.empty">
            </div>
        `;

        tabla.appendChild(row);
}

function AgregarOpciones(){
    const opc = document.createElement('div');
    opc.classList.add('row', 'row-cols-3', 'text-center', 'opcion');
    opc.innerHTML =
        `
            <div class="col">
                <button type="button" class="btn btn-warning" onclick="LimpiarPantalla();">Reiniciar</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-info" onclick="AgregarRenglon();">Agregar Renglon</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success">Generar Clase</button>
            </div>
        `;

    opciones.appendChild(opc);
}

function LimpiarPantalla(){
    let encabezados = Array.prototype.slice.call(document.getElementsByClassName("title"), 0);
    let elementos = Array.prototype.slice.call(document.getElementsByClassName("elemento"), 0);
    let opciones = Array.prototype.slice.call(document.getElementsByClassName("opcion"), 0);
  
    encabezados.forEach(x => {x.remove();});
    elementos.forEach(elemento => {elemento.remove();});
    opciones.forEach(opcion => {opcion.remove();});

    nombreClase.value = '';
    numeroRenglones.value = '';
    continuar.removeAttribute("hidden", ''); 
}

function CambioTipoDato(idSelect, idinput){
    let optionSelect = document.getElementById(idSelect);
    let valorDefault = document.getElementById(idinput);

    valorDefault.value = valoresDefault[optionSelect.value];
}