import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { reset } from 'redux-form';
import { sendContactData } from '../../actions/contactActions';
import isValidEmail from 'sane-email-validation';
import * as Toastr from 'toastr';
import 'toastr/build/toastr.css';

import './contact.css';

class Contact extends Component {

    renderInputField = (field) => {
       return (
            <div>
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control login-inputs" 
                        {...field.input} 
                        placeholder={field.placeholder}
                        autoComplete="of"
                    />
                </div>
                <span className="text-danger">{field.meta.touched ? field.meta.error : ''}</span>
            </div>
        )
    }

    renderTextArea = (field) => {
        return (
            <div className="form-group search">
                <textarea 
                    className="form-control search_help input_same"
                    {...field.input} 
                    placeholder={field.placeholder}
                >  
                </textarea>
                <span className="text-danger">{field.meta.touched ? field.meta.error : ''}</span>
            </div>
        )
    }

    onSubmit = (data) => {
        this.props.dispatch(sendContactData(data));
        if(this.props.contactReducer.success) {
            Toastr.success('Mesazhi u dergua me sukses.');
            this.props.dispatch(reset('ContactForm'));
        }
    }

    render() {
        return (

            <div className="container" id="login_container">
                <div className="row" id="select2-drop">
                    <div className="col-12 col-md-10 col-lg-7 px-0 login_centeer">
                        <div className="login-header mb-5">
                            <div className="login-overlay"></div>
                        </div>
                        <div className="px-3">
                        <h5 className="text-center login_paragraf">Na kontaktoni</h5>
                            <div className="row mb-4">
                                <div className="col-12">
                                    <form onSubmit={this.props.handleSubmit((values) => {
                                        this.onSubmit(values)})}>
                                        <div className="form-group">
                                            <Field
                                                name="name"
                                                component={this.renderInputField}
                                                placeholder="Emri"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Field
                                                name="email"
                                                component={this.renderInputField}
                                                placeholder="Email-i"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Field
                                                name="subject"
                                                component={this.renderInputField}
                                                placeholder="Subjekti"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <Field
                                                name="message"
                                                component={this.renderTextArea}
                                                placeholder="Si mund të ju ndihmojmë?"
                                            />
                                        </div>
                                        <button type="submit" id="login_btn" className="btn btn-primary btn-block w-100 text-white">Dërgo</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            // <div className="contact1" id="contact_container"  style={{overflow: 'hidden'}}>
            //     <div className="container-contact1">
            //         <div className="contact1-pic js-tilt" data-tilt>
            //             <img src="/fotot/email.png" alt="IMG" />
            //         </div>
                  
            //         <form className="contact1-form validate-form " onSubmit={this.props.handleSubmit((values) => {
            //             this.onSubmit(values)})} >
            //             <span className="contact1-form-title">
            //                 Na kontaktoni
            //             </span>

            //             <Field
            //                 name="name"
            //                 component={this.renderInputField}
            //                 placeholder="Emri"
            //             />

            //             <Field
            //                 name="email"
            //                 component={this.renderInputField}
            //                 placeholder="Email-i"
            //             />

            //             <Field
            //                 name="subject"
            //                 component={this.renderInputField}
            //                 placeholder="Subjekti"
            //             />

            //             <Field
            //                 name="message"
            //                 component={this.renderTextArea}
            //                 placeholder="Si mund të ju ndihmojmë?"
            //             />

            //             <div className="container-contact1-form-btn ">
            //                 <button className="contact1-form-btn">
            //                 <span>
            //                     Dërgo
            //                     <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            //                 </span>
            //                 </button>
            //             </div>
            //         </form>
            //     </div>
            // </div>
        
        )
    }
}

function validate(values) {
    const errors = {};

    if(!values.name) {
        errors.name = 'Fusha Emrit duhet plotësuar' //errors.name sepse name=name(si dhe name e kom edhe ne databaz e pranndaj kjo name=name duher me qene ne baz si e kam ne databaz se ndryshe nuk e run qat field tani ne databaz) e kom aty lart tek <Field /> 
    }

    if(!values.email) {
        errors.email = 'Fusha Email-it duhet plotësuar'
    } else if(!isValidEmail(values.email)) {
        errors.email = 'Email-i nuk është valid'
    }

    if(!values.subject) {
        errors.subject = 'Fusha Subjekti duhet plotësuar'
    }

    if(!values.message) {
        errors.message = 'Fusha Përshkrim-it duhet plotësuar'
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        contactReducer: state.contactReducer
    }
}

export default reduxForm({
    validate, 
    form: 'ContactForm',
    destroyOnUnmount: false
})(
    connect(mapStateToProps)(Contact)
)

