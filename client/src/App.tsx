import './App.css'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserPage } from './components/user-page';
import { DoctorPage } from './components/doctor-page';
import { cn } from './lib/utils';
import { EditorPage } from './components/editor-page';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container mx-auto p-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cn(
                      navigationMenuTriggerStyle(),
                      isActive ? "bg-accent text-accent-foreground" : ""
                    )
                  }
                >
                  Home
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    cn(
                      navigationMenuTriggerStyle(),
                      isActive ? "bg-accent text-accent-foreground" : ""
                    )
                  }
                >
                  Patient
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink
                  to="/doctors"
                  className={({ isActive }) =>
                    cn(
                      navigationMenuTriggerStyle(),
                      isActive ? "bg-accent text-accent-foreground" : ""
                    )
                  }
                >
                  Doctor
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink
                  to="/scheine"
                  className={({ isActive }) =>
                    cn(
                      navigationMenuTriggerStyle(),
                      isActive ? "bg-accent text-accent-foreground" : ""
                    )
                  }
                >
                  Scheine
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Routes>
            <Route path="/" element={<div />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/doctors" element={<DoctorPage />} />
            <Route path="/scheine" element={<EditorPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
