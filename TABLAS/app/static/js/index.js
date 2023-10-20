let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },//columnas PARA APLICAR LAS CLASES CSS
        { orderable: false, targets: [5, 6] },//columnas PARA APLICAR LAS CLASES CSS
        { searchable: false, targets: [0, 5, 6] }//columnas PARA APLICAR LAS CLASES CSS
    ],
    pageLength: 4,//pagina 4 en cuatro, *casillas de la tabla*
    destroy: true
};


const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listProgrammers();

    dataTable = $("#datatable-programmers").DataTable(dataTableOptions);//ELEMENTOS DE LA BIBLIOTECAA!!!
    dataTableIsInitialized = true;
};

const listProgrammers = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/app/list_programmers/");
        const data = await response.json();

        let content = ``;
        data.programmers.forEach((programmer, index) => {//interaccion con cada programador
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${programmer.name}</td>
                    <td>${programmer.country}</td>
                    <td>${programmer.birthday}</td>
                    <td>${programmer.score}</td>
                    <td>${programmer.score >= 8 
                        ? "<i class='fa-solid fa-check' style='color: green;'></i>" 
                        : "<i class='fa-solid fa-xmark' style='color: red;'></i>"}
                    </td>
                    <td>
                        <button class='btn btn-sm btn-primary'><i class='fa-solid fa-pencil'></i></button>
                        <button class='btn btn-sm btn-danger'><i class='fa-solid fa-trash-can'></i></button>
                    </td>
                </tr>`;
        });
        tableBody_programmers.innerHTML = content;//forma increible de agregar seleciconando el id sin variable!!
    } catch (ex) {//verifica errores de la pagina
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();//cuando cargue la pagina llamaremos..
});