const infoClase = document.querySelector('#form-info');
const encabezados = document.querySelector('#encabezados');
const tabla = document.querySelector('#box-elementos');
const numeroRenglones = document.querySelector('#numero');
const nombreClase = document.querySelector('#clase');
const continuar = document.querySelector('#btnContinuar');
const checkConstructor = document.querySelector('#constructor');
const opciones = document.querySelector('#box-opciones');

const bodyModal = document.querySelector('#bodyModal');
const headerModal = document.querySelector('#headerModal');

let clase = "";

infoClase.addEventListener('submit', (e) => {
    e.preventDefault(); 

    continuar.setAttribute("hidden", ''); 
    AgregarEncabezados();
    AgregarRenglones(Number(numeroRenglones.value));
    AgregarOpciones();
    numeroRenglones.disabled = true;
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
                <input type="text" name="Default" id="${'default-'+i}" value="string.Empty">
            </div>
        `;

        tabla.appendChild(row);
    }     
}

function AgregarRenglon(){
    let i = numeroRenglones.value;
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
                <button type="button" class="btn btn-success" onclick="GeneraClase();">Generar Clase</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-info" onclick="AgregarRenglon();">Agregar Renglon</button>
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
    numeroRenglones.disabled = false;
}

function CambioTipoDato(idSelect, idinput){
    let optionSelect = document.getElementById(idSelect);
    let valorDefault = document.getElementById(idinput);

    valorDefault.value = valoresDefault[optionSelect.value];
}

function GeneraClase(){
    modal.style.display = "block";

    const nombreClaseMayus = nombreClase.value[0].toUpperCase() + nombreClase.value.substr(1);
    const atributos = [];
    const propiedades = [];
    const constructor = [];
    let campoVacio = false;

    for(let i = 0; i < numeroRenglones.value; i++){
        let rowAcceso = document.getElementById('select1-'+i).value;
        let rowDato = document.getElementById('select2-'+i).value;
        let rowNombre = document.getElementById('atributo-'+i).value;
        let rowDefault = document.getElementById('default-'+i).value;

        if(rowNombre == ""){
            campoVacio = true;
            break;
        }
        let nombrePropiedad = rowNombre[0].toUpperCase() + rowNombre.substr(1);
        

        atributos.push(`${rowAcceso} ${rowDato} ${rowNombre};`);
        propiedades.push(`public ${rowDato} ${nombrePropiedad} { get => ${rowNombre}; set => SetField(ref ${rowNombre}, value, "${nombrePropiedad}"); }`);

        constructor.push(`\t${rowNombre} = ${rowDefault};`);
    }

    if(!campoVacio){
        clase = checkConstructor.checked ? 
                `public class ${nombreClaseMayus} : NotificacionBase\n{\n\t` + atributos.join("\n\t") + "\n\n\t" + propiedades.join("\n\t") + "\n\n\t" + `public ${nombreClaseMayus}()\n\t{\n\t${constructor.join("\n\t")}\n\t}` + "\n}"
                : "//Agregar a los atributos\n" + atributos.join("\n") + "\n\n//Agregar a las propiedades\n" + propiedades.join("\n") + "\n\n//Agregar al constructor\n" + constructor.join("\n");

        bodyModal.innerHTML = clase;
        headerModal.innerHTML = "Codigo generado de la clase: " + nombreClaseMayus;
    }
    else{
        modal.style.display = "none";
        alert("Faltan campos por llenar");
    }
    
}

function Copiar(){
    navigator.clipboard.writeText(clase);
}

/*********** Modal ***********/
var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}