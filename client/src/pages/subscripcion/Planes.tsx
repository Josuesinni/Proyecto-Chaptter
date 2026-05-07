import CardSubscription from "./components/CardSubscription";
import { PlanesList } from "./data";

const Planes = () => {
  return (
    <div>
      <section className="text-center p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Conoce nuestros planes</h2>
          <p>
            Precios accesibles para. Elige el plan que mejor se adapte para tus
            necesidades
          </p>
        </div>
        <div className="flex justify-center gap-x-14">{/*grid grid-cols-2 */}
          {PlanesList.map((plan, idx) => {
            return <CardSubscription {...plan} key={idx} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Planes;
