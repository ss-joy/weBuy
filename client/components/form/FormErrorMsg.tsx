type FormErrorMsgProps = {
  erMsg: string | undefined;
};
function FormErrorMsg({ erMsg }: FormErrorMsgProps) {
  return (
    <p className="text-red-700">
      {erMsg ? erMsg : <span className="opacity-0">sadasdssdads</span>}
    </p>
  );
}

export default FormErrorMsg;
