<template>
<section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
  
                <h3 class="mb-5">Registro de usuarios</h3>
                <div v-if="mensaje==1" class="alert alert-primary" role="alert">
                    Usuario registrado con exito
                </div>

              <!-- <div class="mb-md-5 mt-md-4 pb-5"> -->

                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="correo" type="email" id="typeEmailX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">Correo</label>
                </div>
  
                <div data-mdb-input-init class="form-outline form-white mb-4">
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>
  
                <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
  
                <button @click.prevent="registro()" data-mdb-button-init data-mdb-ripple-init
                 class="btn btn-outline-light btn-lg px-5" type="submit">Registrar</button>
  
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
    export default{
        name:"RegistroView",
        data(){
            return{
                correo:'',
                password:'',
                mensaje: 0
            }
        },
        methods:{
            registro(){
                createUserWithEmailAndPassword(getAuth(), this.correo,this.password)
                .then((data)=>{
                    this.mensaje=1;
                    this.correo='';
                    this.password='';
                })
                .catch((error) =>{
                    alert(error.message);
                });
            },
        }
    }
</script>