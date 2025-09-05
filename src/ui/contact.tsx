import { useState } from "react";
import { useForm } from "react-hook-form";
import { superRefine, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


const registerFormSchema = z.object({
    email: z.string().min(10, {message: 'Min 10 character'})
    .max(25, {message: 'Max 25 character'}).trim()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email format invalid"),
    password: z.string().min(8, {message: 'Min 8 character'}).trim()
    .regex(/^[A-Z]+[a-z]*$/, 'Min 1 character uppercase'),
    confirmPassword: z.string().min(8, 'Min 8 character').trim(),
  }).superRefine(( arg, ctx ) => {
    if ( arg.password !== arg.confirmPassword ) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not macth',
        path: ['RepeatPassword']
      })
    }
  });

  type TypeForm = z.infer<typeof registerFormSchema>;

export const Contact = () => {
  const [show, setShow] = useState(false);

  const form = useForm<TypeForm>({
    resolver: zodResolver(registerFormSchema),
  });
  
  const [cardField, setCardField] = useState(<></>)

  const handleRegist = (v: TypeForm) => {

    setCardField(<>
    <p><b>Email : </b>{v.email}</p>
    <p><b>Password : </b>{v.password}</p>
    <h4 
    className="text-center">DONE!!</h4>
    </>)
 
    form.reset({email: ''});
    form.reset({password: ''});
    form.reset({confirmPassword: ' '})
  };

  return (
    <div className="w-auto p-5 bg-gray-800 rounded-2xl">
      <div className="text-center pb-20">
        <h1 className="text-2xl">
          <b>Sign in</b>
        </h1>
        <p>Masuk untuk melanjutkan ke dashboard.</p>
      </div>
      <form onSubmit={form.handleSubmit(handleRegist)}>
        <div className="mb-5">
          {/* email */}
          <label>
            Email :<br />
            <input
              {...form.register("email", {required: true})}
              className="w-80 rounded-md my-2"
              type="email"
              autoComplete="email"
              placeholder="Example@gmail.com"
            />
          </label><br/>
          <p className="text-xs text-red-400">{form.formState.errors.email?.message}</p>
        </div>
        <div className="mb-5">
          {/* password */}
          <label>
            Password :<br />
            <input
              {...form.register("password", {required: true})}
              className="w-full rounded-md my-2"
              type={show? "text" : "password"}
              autoComplete="Password"
              placeholder="*********"
            />
          </label>
        <p className="text-xs text-red-400">{form.formState.errors.confirmPassword?.message}</p>
        {/* repeatPassword */}
          <label>
            Password :<br />
            <input
              {...form.register("confirmPassword", {required: true})}
              className="w-full rounded-md my-2"
              type={show? "text" : "password"}
              autoComplete="password"
              placeholder="*********"
            />
          </label>
            <input
            type="checkbox"
            onChange={value => setShow(value.target.checked)}
            className="text-center px-2 rounded outline-none"
           />Show password
        <p className="text-xs text-red-400">{form.formState.errors.password?.message}</p>
        </div>
        <div>
          <button
           className="bg-gray-500 p-2 rounded-xl" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div className="m-5">{cardField}</div>
    </div>
  );
};