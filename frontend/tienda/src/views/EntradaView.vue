<template>
    <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">
      
                    <h3 class="mb-5">Entrada</h3>
                    <div v-if="mensaje" class="alert alert-danger" role="alert">
                        {{mensaje}}
                    </div>
    
                  <!-- <div class="mb-md-5 mt-md-4 pb-5"> -->
    
                    <div data-mdb-input-init class="form-outline form-white mb-4">
                      <input v-model="correo" type="email" id="typeEmailX" class="form-control form-control-lg" />
                      <label class="form-label" for="typeEmailX">Correo</label>
                    </div>
      
                    <div data-mdb-input-init class="form-outline form-white mb-4">
                      <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" />
                      <label class="form-label" for="typePasswordX">Contrasenia</label>
                    </div>
      
                    <!-- <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p> -->
                    <button @click.prevent="registroGoogle()" class="btn btn-outline-light btn-lg px-5" type="submit">
                      <Icon icon="logos:google-icon"/>Google</button>
                    <button @click.prevent="registro()" class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>
      
                    <!-- <button @click.prevent="registro()" data-mdb-button-init data-mdb-ripple-init
                     class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button> -->

                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
    <script>
    import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
    import { Icon } from '@iconify/vue'
    export default{
        name:"EntradaView",
        components: {Icon},
        data(){
            return{
                correo:'',
                password:'',
                mensaje: 0
            }
        },
        methods:{
            registro(){
                signInWithEmailAndPassword(getAuth(), this.correo,this.password)
                .then((data)=>{
                    this.mensaje="";
                    this.correo="";
                    this.password="";
                })
                .catch((error) =>{
                   switch (error.code) {
                    case "auth/invalid-email":
                        this.mensaje="Correo no valido";
                        break;
                   case "auth/user-not-found":
                        this.mensaje="Usuario no valido";
                        break;
                    case "auth/wrong-password":
                        this.mensaje="Contrasenia Incorrecta";
                        break;
                    default:
                        this.mensaje="Usuario no valido";
                        break;
                   }
                });
            },
            registroGoogle(){
              const provider = new GoogleAuthProvider();
              signInWithPopup(getAuth(),provider)//va a ser controlado por firebase, provider
              .then((result)=>{
                this.$route.push('/clientes/');

              });
            }
        }
    }
</script>