const ML_API = document.getElementById('ML-API');   // ID del unico div.
const repository = "https://jairtorres1003.github.io/files/FilesMaxylu/";  // URL del repositorio donde se alojan las imagenes.
var foldersType = [];  // ['Electric/', 'Stone/'] Carpeta de cada tipo de briket.
var subFoldersType = [];  //Sub carpetas con la cantidad de bikets por carpeta.
const orientationBrik = new Array ('In front/', 'Behind/'); // Carpeta según orientación de los brikets.
var textCode = 'var MaxyluApi = {\n';
var t = "    ";

const btn_generator = document.getElementById('btn-generator');
const get_inputN = document.getElementsByClassName('get_inputN');
btn_generator.addEventListener('click', function(e){
    let codeValue = [false, false];
    foldersType = [];
    subFoldersType = [];
    if ((get_inputN[0].value || get_inputN[1].value || get_inputN[2].value || get_inputN[3].value) !== "") {
        foldersType.push('Electric/');
        subFoldersType.push({
            folders: [], 
            unidFolders: []
        });
        for (let x = 0; x < 4; x++) {
            if (get_inputN[x].value > 0) {
                let cont = subFoldersType.length - 1;
                subFoldersType[cont].folders.push(get_inputN[x].name.slice(2) + "/");
                subFoldersType[cont].unidFolders.push(get_inputN[x].value);
            }
        }
        codeValue[0] = true;
    } else {
        codeValue[0] = false;
    }
    if ((get_inputN[4].value || get_inputN[5].value || get_inputN[6].value || get_inputN[7].value) !== "") {
        foldersType.push('Stone/');
        subFoldersType.push({
            folders: [], 
            unidFolders: []
        });
        for (let x = 4; x < 8; x++) {
            if (get_inputN[x].value > 0) {
                let cont = subFoldersType.length - 1;
                subFoldersType[cont].folders.push(get_inputN[x].name.slice(2) + "/");
                subFoldersType[cont].unidFolders.push(get_inputN[x].value);
            }
        }
        codeValue[1] = true;
    } else {
        codeValue[1] = false;
    }
    // ML_API.innerHTML = "";
    if (codeValue[0] === true || codeValue[1] === true) {
        setTimeout(() => {
            generatorCodeApi();
        }, 500);
    }
    
});

function generatorCodeApi() {
    textCode = 'var MaxyluApi = {\n';
    //Creando la API. -----------------------------------------------------------------------------------------------------------------------------------
    for (let x = 0; x < foldersType.length; x++) {
        textCode = textCode + (t) + foldersType[x].replace("/", "") + ": {\n" + (t+t) + "Category: {\n";
    
        for (let y = 0; y < subFoldersType[x].folders.length; y++) {
            let content1 = (t+t+t) + (subFoldersType[x].folders[y].replace("/", "")).split(" ").join("_") + ": {\n";
            let content2 = (t+t+t+t) + "Names: [\nnmBrik";
            let content3 = (t+t+t+t) + "],\n";
            let content4 = (t+t+t+t) + "OrientationImage: {\n";
            textCode = textCode + content1 + content2 +  content3 + content4;
    
            for (let z = 0; z < orientationBrik.length; z++) {
                let punctuationOpen = (t+t+t+t+t) + (orientationBrik[z].replace("/", "")).split(" ").join("_") + ": [\n";
                textCode = textCode + punctuationOpen;
    
                let names = "";
                //For usado para crear la url segun la cantidad de imagenes por carpeta de categoria.
                for (let i = 1; i <= subFoldersType[x].unidFolders[y]; i++) {
                    //Nombres para cada briket.-------------------------------------------------------
                    if (z === 0) {
                        names = names + (t+t+t+t+t) + '"Briket_' + i + '",\n';
                    }
                    // Creación url. ------------------------------------------------------------------------
                    let image = 'Photo_brikets(' + i + ').png'; // Imagen.
                    // Concatenación de los datos para formar la url de la imagen. ---------
                    let image_URL = (t+t+t+t+t+t) + '"' + (repository + foldersType[x] + subFoldersType[x].folders[y] + orientationBrik[z] + image).split(" ").join("%20") + '",\n';
                    textCode = textCode + image_URL; // Agregando la url.
                }
                let coma = "";
                if (z !== orientationBrik.length - 1) { coma = ","; }
                let punctuationClose = (t+t+t+t+t) + ']' + coma + '\n';
                textCode = textCode.replace("nmBrik", names) + punctuationClose;
            }
            let coma = "";
            if (y !== subFoldersType[x].folders.length - 1) { coma = ","; }
            textCode = textCode + (t+t+t+t) + "}\n" + (t+t+t) + "}" + coma + "\n";
        }
        let coma = "";
        if (x !== foldersType.length - 1) { coma = ","; }
        textCode = textCode + (t+t) + "}\n" + (t) + "}" + coma + "\n";
    }

    // for (let x = 0; x < get_inputN.length; x++) {
    //     if (get_inputN[x].value === "") {
    //         get_inputN[x].value = 0;
    //     }
    // }


    // let numberStone = t + 'numberStone = [' + get_inputN[0].value + ', ' + get_inputN[1].value + ', ' + get_inputN[2].value + ', ' + get_inputN[3].value + '],\n';
    // let numberElectric = t + 'numberElectric = [' + get_inputN[4].value + ', ' + get_inputN[5].value + ', ' + get_inputN[6].value + ', ' + get_inputN[7].value + ']\n';
    // textCode = textCode + numberStone + numberElectric + "}";
    textCode = textCode + "}";
    ML_API.innerHTML = textCode ;
}

window.addEventListener('click', function(e){
    if (e.target !== document.getElementsByClassName('edit')[0]) {
        saveEditCode();
    }
    if(e.target.classList.contains("str") ){
        let node_c = this.document.createElement('div');
        node_c.setAttribute('class', 'c-edit');
        
        let node = this.document.createElement('input');
        node.type = "text";
        node.setAttribute('class', 'edit');
        node.setAttribute('onkeydown', 'pressEdit(event)');
        
        let textEditN = e.target.textContent.length;
        if (textEditN >= 5) {
            let restSize = parseInt(textEditN / 40);
            let size = textEditN - 4 - restSize;
            node.removeAttribute('style');
            node.setAttribute('size', size);
        } else {
            let withNode = 8 * textEditN;
            node.style.width = withNode + "px";
        }
        node.value = e.target.textContent;
        node_c.appendChild(node);
        node.select();
        e.target.textContent = "";
        e.target.appendChild(node_c);
        e.target.classList.add('codeEdit');
        
        let node_s = this.document.createElement('span');
        node_s.setAttribute('class', 'pun');
        node_s.textContent = ",";
        node_c.appendChild(node_s)
    } else{
        if (e.target !== document.getElementsByClassName('edit')[0]) {
            saveEditCode();
        }
    }
});

function pressEdit(e) {
    let newCode = document.getElementsByClassName('edit')[0];
    let textEditN = newCode.value.length;
    let restSize = parseInt(textEditN / 40);
    let size = 0;
    var keycode = e.keyCode || e.which;
    if (keycode === 13) {
        saveEditCode();
    }
    if (keycode === 8) {
        if (textEditN > 5) {
            size = (textEditN - 1) - 4 - restSize;
            newCode.removeAttribute('style');
            newCode.setAttribute('size', size);
        } else {
            let withNode = 8 * textEditN - 8;
            newCode.style.width = withNode + "px";
        }
    } else {
        if (textEditN > 5) {
            size = (textEditN + 1) - 4 - restSize;
            newCode.removeAttribute('style');
            newCode.setAttribute('size', size);
        } else {
            let withNode = 8 * textEditN + 8;
            newCode.style.width = withNode + "px";
        }
    }
}
function saveEditCode() {
    if (document.getElementsByClassName('edit')[0] !== undefined){
        let codeEdit = document.getElementsByClassName('codeEdit')[0];
        let newCode = document.getElementsByClassName('edit')[0];
        if (newCode.value === " " || newCode.value === "" || newCode.value === '""') {
            codeEdit.textContent = '"undefined"';
            codeEdit.classList.remove('codeEdit');
        } else {
            if (newCode.value[0] === '"') {
                newCode.value = newCode.value.slice(1);
            }
            if (newCode.value[newCode.value.length - 1] === '"') {
                newCode.value = newCode.value.slice(0, -1);
            }
            codeEdit.textContent = '"' + (newCode.value).trim() + '"';
            codeEdit.classList.remove('codeEdit');
        }
    }
}
const copy_code_MLApi = document.getElementById('copy-code_MLApi');
const success_copy = document.getElementById('success-copy');
copy_code_MLApi.addEventListener('click', function(e){
    copyCode();
});
function copyCode() {       
    // Crea un input para poder copiar el texto dentro
    let copyText = document.getElementById('codeML-Api').innerText;
    const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    // Delete created Element
    textArea.remove();
}

//Descargar codigo ----------------------------------------------------------------------------------------
const download = document.getElementById('download');
const btn_download = document.getElementById('btn-download');
btn_download.addEventListener('click', function(e){
    let copyText = document.getElementById('codeML-Api').innerText;
    var blob = new Blob([copyText], { type: 'text/javascript;charset=utf-8' });
    var link = window.URL.createObjectURL(blob);
    download.href = link;
    download.click();
});