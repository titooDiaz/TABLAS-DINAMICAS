let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: true, targets: [0,1,2,3,4,5,6] },
        { responsivePriority: 1, targets: [0, 1, 2, 3, 4, 5, 6] }
    ],
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
                <tr class="">
                    <td><i class='fa-solid fa-circle' style='color: green;'></i></td>
                    <td>${programmer.name}</td>
                    <td>${programmer.country}</td>
                    <td>${programmer.birthday}</td>
                    <td>${programmer.score}</td>
                    <td>${programmer.score >= 8 ? "<i class='fa-solid fa-check' style='color: green;'></i>" : "<i class='fa-solid fa-xmark' style='color: red;'></i>"}</td>
                    <td>
                        <button class='btn btn-sm btn-primary'><i class='fa-solid fa-pencil'></i></button>
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
