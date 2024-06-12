
import { getData, getDocumento, remove, save, update } from './firestore.js'

let id = 0

document.getElementById('btnSave').addEventListener('click', (event) => {
    
    event.preventDefault()
   
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const emp = {
            
            nom: document.getElementById('nombre').value,
            ape: document.getElementById('apellido').value,
            run: document.getElementById('run').value,
            fecha: document.getElementById('fecha').value,
            email: document.getElementById('email').value,
            fono: document.getElementById('fono').value,
            cosa: document.getElementById('cosa').value,
            vobjeto: document.getElementById('vObjeto').value,
            sueldo: document.getElementById('sueldo').value,
            

        }
        if (id == 0) {
            
            save(emp)
            Swal.fire('Guardado','','success')
        } else{
           
            update(id,emp)
        }
        id = 0
        limpiar()
    }
})

window.addEventListener('DOMContentLoaded', () => {
   
    getData((datos) => {
        let tabla = ''
      
        datos.forEach((emp) => {
            
            const item = emp.data()
            tabla += `<tr>
                
                <td>${item.nom}</td>
                <td>${item.ape}</td>
                <td>${item.run}</td>
                <td>${item.fecha}</td>
                <td>${item.email}</td>
                <td>${item.fono}</td>
                <td>${item.cosa}</td>
                <td>${item.vobjeto}</td>
                <td>${item.sueldo}</td>
                
                <td nowrap>
                    <button class="btn btn-warning" id="${emp.id}">Editar</button>
                    <button class="btn btn-danger" id="${emp.id}">Eliminar</button>
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
       
        document.querySelectorAll('.btn-danger').forEach(btn => {
           
            btn.addEventListener('click', () => {
                
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    
                    if (result.isConfirmed) {
                       
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su regostro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
       
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                
                const doc = await getDocumento(btn.id)
               
                const emp = doc.data()

                
                document.getElementById('nombre').value = emp.nom
                document.getElementById('apellido').value = emp.ape
                document.getElementById('run').value = emp.run
                document.getElementById('fecha').value = emp.fecha
                document.getElementById('email').value = emp.email
                document.getElementById('fono').value = emp.fono
                document.getElementById('cosa').value = emp.cosa
                document.getElementById('vObjeto').value = emp.vobjeto
                document.getElementById('sueldo').value = emp.sueldo
             

                
                id = doc.id
               
                document.getElementById('run').readOnly = true
               
                document.getElementById('btnSave').value = 'Editar'
            })
        })

    })
})