
$(document).ready(function () {
    cargarUsuarios();

    ObtenerUser();
   
})

function ObtenerUser() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var fechaNacimiento = new Date(data.results[0].dob.date);
            var fechaFormateada = fechaNacimiento.toLocaleDateString();
            var tBody = $("#tBody")
            var row = `
                <td> <img src="${data.results[0].picture.medium}"/></td>
                <td>${data.results[0].name.first} ${data.results[0].name.last}</td>
                <td>${data.results[0].email}</td>
                <td>${fechaFormateada}</td>
                <td>${data.results[0].location.street.number} ${data.results[0].location.street.name}</td>
    `;
            console.log(row);
            tBody.append(row);
            guardarUsuario(data.results[0]);
        }
    });

}
function guardarUsuario(usuario) {
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuariosGuardados.push(usuario);

    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
}
function cargarUsuarios() {
    // Obtener los usuarios desde localStorage
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Cargar los usuarios en la tabla
    usuariosGuardados.forEach(function (usuario) {
        var tBody = $("#tBody");
        var row = `
            <tr>
                <td><img src="${usuario.picture.thumbnail}" alt="Foto" /></td>
                <td>${usuario.name.first} ${usuario.name.last}</td>
                <td>${usuario.email}</td>
                <td>${usuario.dob.date}</td>
                <td>${usuario.location.street.number} ${usuario.location.street.name}</td>
            </tr>
        `;
        tBody.append(row);
    });
}
function eliminarUsuarios() {
    localStorage.removeItem('usuarios');
    $("#tBody").empty();
}