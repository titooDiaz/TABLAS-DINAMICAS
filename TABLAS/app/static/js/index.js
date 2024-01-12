let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    dom: 'Bfrtilp',
  buttons: [
    {
      extend: 'excelHtml5',
      text: '<i class="fas fa-file-excel"></i> ',
      titleAttr: 'Exportar a Excel',
      className: 'bg-gray-400',
    },
    {
      extend: 'pdfHtml5',
      text: '<i class="fas fa-file-pdf"></i> ',
      titleAttr: 'Exportar a PDF',
      className: 'bg-gray-300',
    },
    {
      extend: 'print',
      text: '<i class="fa fa-print"></i> ',
      titleAttr: 'Imprimir',
      className: 'bg-gray-400',
    },
  ],
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "cursor-pointer", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: true, targets: [0,1,2,3,4,5,6] },
        { responsivePriority: 1, targets: [0, 1, 2, 3, 4, 5, 6] }
    ],

    language: {
        processing: 'Procesando...',
        lengthMenu: 'Mostrar _MENU_ registros',
        zeroRecords: 'No se encontraron resultados',
        emptyTable: 'Ningún dato disponible en esta tabla',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        search: 'Buscar:',
        infoThousands: ',',
        loadingRecords: 'Cargando...',
        decimal: ',',
        thousands: '.',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior',
            },
      },
    

    pageLength: 4,
    destroy: true,
    responsive: true,
    createdRow: function (row, data, dataIndex) {
        $(row).addClass('details');
    }
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listProgrammers();

    dataTable = $("#datatable-programmers").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
};

const listProgrammers = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/app/list_programmers/");
        const data = await response.json();

        let content = ``;
        data.programmers.forEach((programmer, index) => {
            content += `
                <tr>
                    <td class="p-2"> <i class='fa-solid fa-circle' style='color: green;'></i> ${programmer.id}</td>
                    <td class="bg-gray-200 p-2">${programmer.name}</td>
                    <td class="p-2">${programmer.country}</td>
                    <td class="bg-gray-200 p-2">${programmer.birthday}</td>
                    <td class="p-2">${programmer.score}</td>
                    <td class="bg-gray-200 p-2">${programmer.score >= 8 ? "<i class='fa-solid fa-check' style='color: green;'></i>" : "<i class='fa-solid fa-xmark' style='color: red;'></i>"}</td>
                    <td class="p-2 flex justify-center">
                        <div class="p-1"></div>
                        <button class='btn btn-sm btn-primary'><i class='fa-solid fa-pencil'></i></button>
                        <div class="w-2"></div>
                        <button class='btn btn-sm btn-danger'><i class='fa-solid fa-trash-can'></i></button>
                    </td>
                </tr>`;
        });
        tableBody_programmers.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});
