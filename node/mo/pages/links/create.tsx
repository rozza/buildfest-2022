import { Formik } from "formik"
import { useRouter } from "next/router"
import Link from "next/link"
import validator from "validator"


// Define Prop Interface
interface Props {
    url: string
}

// Define Component
function CreateForm(props: Props) {
    const router = useRouter()
    return (
        <Formik
            initialValues={{ alias: "", link: "" }}
            validate={values => {
                const errors: any = {};
                if (!values.alias) {
                    errors.alias = 'Required';
                }
                if (!values.link) {
                    errors.link = 'Required';
                }
                if (!validator.isURL(values.link)) {
                    errors.link = "Invalid URL"
                }

                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                await fetch(props.url, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }).then(() => {
                    setSubmitting(false);
                    router.push("/")
                })
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <h2 className="subtitle">
                        Edit link:
                    </h2>
                    <div className="field">
                        <label className="label">Alias</label>
                        <div className="control">
                            <input className="input is-info" type="text" name="alias" value={values.alias} onChange={handleChange} />
                            <label className="help is-danger">
                                {errors.alias && touched.alias && errors.alias}
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Link</label>
                        <div className="control">
                            <input className="input is-link" type="text" name="link" value={values.link} onChange={handleChange} />
                            <label className="help is-danger">
                                {errors.link && touched.link && errors.link}
                            </label>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button type="submit" className="button is-primary" disabled={isSubmitting}>Submit</button>
                        </div>
                        <div className="control">
                            <Link href="/"><button className="button is-link is-light">Cancel</button></Link>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}


// export getStaticProps to provie API_URL to component
export async function getStaticProps(context: any) {
    return {
        props: {
            url: process.env.API_URL,
        },
    }
}

// export component
export default CreateForm