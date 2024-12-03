

// Import necessary modules and styles
import './styles/sidebar.css';
import './styles/LoginForm.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import StoreProvider from './storeProvider';
import  './styles/headerComponent.css';



// Import the SideNav component
import SideNav from './components/sidebar';
import LoginForm from './components/LoginForm';

// Define the layout component
export default function Layout({ children }: { children: React.ReactNode }) {


  
  return (
    <StoreProvider>
 <html>
      <body>
      <div >
      
    
   
   {children}
  </div>
      </body>
      
    </html>
    </StoreProvider>
   
    
   
  );
}
