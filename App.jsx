import React, { useState } from 'react';
import { Clock, CheckCircle, Smartphone, BarChart3, Shield, Users, ArrowRight, Menu, X, Mail } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setMessage(data.error || 'Hubo un error al procesar tu solicitud.');
      }
    } catch (error) {
      setMessage('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                fichaX
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-indigo-600 transition-colors">Características</a>
              <a href="#benefits" className="hover:text-indigo-600 transition-colors">Beneficios</a>
              <a href="#contact" className="hover:text-indigo-600 transition-colors">Contacto</a>
            </div>

            <div className="hidden md:block">
              <a 
                href="#waitlist" 
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
              >
                Acceso Anticipado
              </a>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-slate-600 hover:text-slate-900">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600">Características</a>
              <a href="#benefits" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600">Beneficios</a>
              <a href="#contact" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600">Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            En desarrollo
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            El control horario <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              inteligente y simple.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            fichaX moderniza la gestión de recursos humanos. Cumple la normativa legal, gestiona turnos y optimiza el tiempo de tu equipo desde cualquier dispositivo.
          </p>

          <div className="mt-10 max-w-md mx-auto" id="waitlist">
            {!submitted ? (
              <>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className="flex-1 appearance-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Enviando...' : 'Notificarme'}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
                {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
              </>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-center text-green-700 animate-fade-in">
                <CheckCircle className="h-5 w-5 mr-2" />
                ¡Gracias! Te avisaremos cuando fichaX esté disponible.
              </div>
            )}
            <p className="mt-3 text-sm text-slate-500">
              Únete a la lista de espera para obtener 3 meses gratis en el lanzamiento.
            </p>
          </div>
        </div>

        {/* Abstract Dashboard Preview */}
        <div className="mt-16 relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-900/10">
            <div className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden relative h-64 md:h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
              <div className="text-center">
                <Clock className="h-16 w-16 text-indigo-500 mx-auto mb-4 opacity-50" />
                <h3 className="text-slate-400 text-lg font-medium">Dashboard en construcción</h3>
                <p className="text-slate-500 text-sm">Próximamente verás el panel de control aquí</p>
              </div>
              
              {/* Decorative elements representing UI */}
              <div className="absolute top-4 left-4 right-4 h-8 bg-slate-700/50 rounded-lg w-3/4"></div>
              <div className="absolute top-16 left-4 w-48 h-32 bg-slate-700/30 rounded-lg border border-slate-600/30"></div>
              <div className="absolute top-16 right-4 w-64 h-32 bg-slate-700/30 rounded-lg border border-slate-600/30 hidden sm:block"></div>
              <div className="absolute bottom-4 left-4 right-4 h-32 bg-slate-700/30 rounded-lg border border-slate-600/30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Todo lo que necesitas para RRHH
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Diseñado para simplificar la burocracia y mejorar la productividad de tu empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Smartphone className="h-6 w-6 text-white" />}
              title="Fichaje Multi-dispositivo"
              description="Tus empleados pueden registrar su jornada desde el móvil, web o tablet. Con geolocalización opcional."
              color="bg-blue-500"
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6 text-white" />}
              title="Cumplimiento Legal 100%"
              description="Adaptado a la normativa vigente de control horario. Evita sanciones y mantén todo en orden."
              color="bg-emerald-500"
            />
            <FeatureCard 
              icon={<BarChart3 className="h-6 w-6 text-white" />}
              title="Informes en Tiempo Real"
              description="Genera reportes de horas trabajadas, extras y ausencias con un solo clic. Exportable a PDF y Excel."
              color="bg-violet-500"
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6 text-white" />}
              title="Gestión de Vacaciones"
              description="Portal del empleado para solicitar días libres, gestionar bajas y visualizar el calendario laboral."
              color="bg-orange-500"
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6 text-white" />}
              title="Control de Horas Extras"
              description="Monitoriza el exceso de jornada y gestiona la bolsa de horas de forma automática."
              color="bg-indigo-500"
            />
            <FeatureCard 
              icon={<CheckCircle className="h-6 w-6 text-white" />}
              title="Firma Digital"
              description="Firma de documentos y nóminas integrada en la misma plataforma. Cero papel."
              color="bg-pink-500"
            />
          </div>
        </div>
      </section>

      
      {/* Benefits Section (New) */}
      <section id="benefits" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                No es solo fichar,<br />
                <span className="text-indigo-600">es optimizar tu empresa.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                fichaX transforma la tarea tediosa del control horario en una ventaja competitiva para tu departamento de recursos humanos.
              </p>
              
              <div className="space-y-8">
                <BenefitItem 
                  icon={<Zap className="h-6 w-6 text-indigo-600" />}
                  title="Ahorra un 80% de tiempo administrativo" 
                  description="Olvídate de perseguir a los empleados para que firmen o de cuadrar Excels a fin de mes. Automatiza los recordatorios y cálculos."
                />
                <BenefitItem 
                  icon={<TrendingUp className="h-6 w-6 text-indigo-600" />}
                  title="Cero errores humanos" 
                  description="Los cálculos automáticos eliminan los fallos en el recuento de horas extras, saldos de vacaciones y exportación de nóminas."
                />
                <BenefitItem 
                  icon={<Heart className="h-6 w-6 text-indigo-600" />}
                  title="Mejora el clima laboral" 
                  description="La transparencia genera confianza. Cuando los empleados tienen acceso claro a sus horas y saldos, se reducen las consultas a RRHH."
                />
              </div>
            </div>
            
            {/* Visual Benefits Representation */}
            <div className="relative">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <div className="space-y-6">
                  {/* Mockup: Time Saving Comparison */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Tiempo dedicado a gestión mensual</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-500">Gestión Tradicional / Excel</span>
                          <span className="text-red-500 font-medium">15 horas</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div className="bg-slate-400 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-indigo-600 font-medium">Con fichaX</span>
                          <span className="text-emerald-500 font-bold">2 horas</span>
                        </div>
                        <div className="w-full bg-indigo-50 rounded-full h-2.5">
                          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '13%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                     <div className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-lg border border-indigo-100">
                        <div className="bg-indigo-100 p-2 rounded-full shrink-0">
                          <Users className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-indigo-900 text-sm font-medium italic">"Desde que usamos fichaX, el cierre de nóminas nos lleva una tarde en lugar de una semana entera."</p>
                          <p className="text-indigo-600 text-xs mt-2 font-semibold">- Marta G., Directora de RRHH</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-violet-600 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            ¿Listo para modernizar tu empresa?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Estamos terminando los últimos detalles. Sé el primero en probar fichaX y disfruta de ventajas exclusivas de lanzamiento.
          </p>
          <a 
            href="#waitlist"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Unirme a la lista de espera
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-6 w-6 text-indigo-600" />
                <span className="text-xl font-bold text-slate-900">fichaX</span>
              </div>
              <p className="text-slate-500 max-w-xs">
                La solución definitiva para el control horario y la gestión de recursos humanos en la nube.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Producto</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-indigo-600">Precios</a></li>
                <li><a href="#" className="hover:text-indigo-600">Seguridad</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> hola@fichax.com
                </li>
                <li><a href="#" className="hover:text-indigo-600">Soporte</a></li>
                <li><a href="#" className="hover:text-indigo-600">Twitter / X</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} fichaX. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900">Privacidad</a>
              <a href="#" className="hover:text-slate-900">Términos</a>
              <a href="#" className="hover:text-slate-900">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color }) => (
  <div className="group relative p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300">
    <div className={`absolute top-6 left-6 inline-flex p-3 rounded-lg ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <div className="mt-16">
      <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default App;