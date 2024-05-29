<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Editar cliente</h4>
                <div v-if="mensaje==1" class="alert alert-primary" role="alert"> 
                    Datos Actualizados con exito
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                <div class="mb-3">
                    Id
                    <Field name="id" id="id" type="number" class="form-control" v-model="model.cliente.id"/>
                    <ErrorMessage name="id" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    Nombre
                    <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.cliente.nombre"/>
                    <ErrorMessage name="nombre" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    Apellido
                    <Field name="apellido" id="apellido" apellidotype="text" class="form-control" v-model="model.cliente.apellido"/>
                    <ErrorMessage name="apellido" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    Direccion
                    <Field name="direccion" id="direccion" type="text" class="form-control" v-model="model.cliente.direccion"/>
                    <ErrorMessage name="direccion" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    Telefono
                    <Field name="telefono" id="telefono" type="text" class="form-control" v-model="model.cliente.telefono"/>
                    <ErrorMessage name="telefono" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    RFC
                    <Field name="rfc" id="rfc" type="text" class="form-control" v-model="model.cliente.rfc"/>
                    <ErrorMessage name="rfc" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    CURP
                    <Field name="curp" id="curp" type="text" class="form-control" v-model="model.cliente.curp"/>
                    <ErrorMessage name="curp" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    CP
                    <Field name="cp" id="cp" type="text" class="form-control" v-model="model.cliente.cp"/>
                    <ErrorMessage name="cp" class="errorValidacion"/>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </Form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {Field, Form,ErrorMessage} from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export default {
    name: 'ClientesCreate',
    components: {Field, Form,ErrorMessage},
    data() {
        const phoneRegex = new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
        );
        const rfcRegex = new RegExp(
            /^([a-z]{3,4})(\d{2})(\d{2})(\d{2})([0-9a-z]{3})$/i
        );
        const curpRegex = new RegExp(
            /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9][12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/g
        );
        const cpRegex = new RegExp(
            /^[0-9]{5}$/
            //para checar validaciones famosas es buscando 
            //REGEX CURP MEXICO
        );
        const validationSchema = toTypedSchema(
            zod.object({
                id: zod.number({message: 'Solo numeros'}).int(),
                nombre: zod.string().min(1,{message: 'Requerido'}),
                apellido: zod.string().min(1,{message: 'Requerido'}),
                direccion: zod.string().min(1,{message: 'Requerido'}),
                telefono: zod.string().regex(phoneRegex, 'Numero no valido').min(10,{message:'Minimo 10'}),
                rfc: zod.string().regex(rfcRegex, 'RFC no valido'),
                curp: zod.string().regex(curpRegex, 'CURP no valida'),
                cp: zod.string().regex(cpRegex,'Codigo postal no valido'),
            })
        );//lleva ; ?
        return {
            validationSchema,
            mensaje: 0,
            model: {
                cliente: {
                    id: '',
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    telefono: '',
                    rfc: '',
                    curp: '',
                    cp: ''
                }
            }
        }
    },
    mounted(){
        this.getCliente(this.$route.params.id);
    },
    methods: {
        getCliente(clienteID){
            axios.get('http://localhost:3000/api/clientes/'+clienteID).then(res=>{
                this.model.cliente=res.data[0];
                //this.model.cliente.id=res.data[0].id;
                //this.model.cliente.nombre = res.data[0].nombre
            });
        },
        onTodoBien(){
            this.guardarCliente();
        },
        guardarCliente() {
            axios.put('http://localhost:3000/api/clientes/'+this.$route.params.id, this.model.cliente).then(res => { //tomamos el id mediante la url por seguridad y no actualizar cosas que no son
                if(res.data.affectedRows == 1){ //si insertamos 1 registro
                    //limpiar cuadros de texto
                    this.model.cliente = { //asignar este objeto a this.model.cliente
                    id: '',
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    telefono: '',
                    rfc: '',
                    curp: '',
                    cp: ''
                    }
                //para que salga el mensaje de exito
                this.mensaje=1;
                }
            });
        }
    }
    //siempre poner el estilo en la parte de style
}
</script>
<style scoped> 
    .errorValidacion{
        color: red;
        font-weight: bold;
    }
</style>