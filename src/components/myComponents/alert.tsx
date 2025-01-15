import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


interface ErrorAlertProps {
  message: string;
}


export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert variant="destructive"   className="bg-gray-800 border-gray-700">
      <AlertCircle className="h-4 w-4 " />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
}
