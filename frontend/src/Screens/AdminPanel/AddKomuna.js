import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create } from '../../actions/komunaActions';
import { clear } from '../../actions/clear_action';
import { useForm, reset } from 'react-hook-form'; // LIBRARI PER VALIDIM TE INPUTEVE NE FUNCTION COMPONENTS
import * as Toastr from 'toastr';
import 'toastr/build/toastr.css';

import './add_screen.css';

export default function AddKomuna(props) {
    const { register, handleSubmit, errors } = useForm({});

    const [name, setName] = useState('');
  
    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const add_komuna = useSelector(state => state.add_komuna);
    const { success } = add_komuna;

    const dispatch = useDispatch();

    useEffect(() => {
        if(!userInfo) { // nese nuk jemi t logum mos me na dergu tek/krijo-kategorin po tek logini, e di a jom i logum permes userInfo(cookie pra)
            props.history.push("/login");
        }
        if(userInfo && !userInfo.isAdmin) {
            props.history.push('/notfound');
        }
        
        if(success) {
            Toastr.success('Komuna u krijua me sukses.');   
            props.history.push('/admin-paneli');
        }
      
        return () => {
            dispatch(clear()); //duhet me shtu kete metod sepse ndryshe, kur psh te shtoj nje komunë ekzekutohet rreshti 60-62 edhe ma qet kete faleminderit per komunën, por pastaj nese e ndrroj pagen dal psh tek /comments-doctor edhe kthehna prap tek /profile/26t7128ad athere ka me ma qit apet kete tekstin faleminderit per komunë e prandaj duhet me bo clear state-n. kete rreshtin60 po duhet ktu me bo sepse ndryshe po duhet 2 her me kliku butonin dergo per me mujt psh me shtu nje komunë per doktorin,a nese e boj ktu n useEffect vetem me njeher funksionon.

        };
    }, [success]);

    const submitHandler = () => {
       dispatch(create(name));
    }

    return (
            <div id="shto_kategorin">
                <div className="container" id="select2-drop">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-md-10 mt-3 pb-2">
                            <h3 className="text-center text-secondary pb-2">Krijo Komunën</h3>
                            <form onSubmit={handleSubmit(submitHandler)} className="mt-3 pt-5">
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="name"
                                        className="form-control add_shpalljen" 
                                        placeholder="Komuna" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        ref={register({ required: true })}
                                    />
                                    <span className="text-danger">{errors.name && 'Fusha Komuna duhet plotësuar'}</span>
                                </div>
                                <input type="submit" className="btn btn-secondary btn-block" value="Krijo Komunën" />
                            </form>

                        </div>
                </div>

            </div>
        </div>
    )
}