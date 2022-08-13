import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";



// when a module is loaded @provide() will automatically register(or binding) it 
// and use buildProviderModule to active this feature 
import "./controllers";
import "./services";
import "./utils";
import "./repositories";

// set up container
let container = new Container();

container.load(buildProviderModule());

// Manual Binding
// container.bind<UserService>("UserService").to(UserService);
// container.bind<BookService>("BookService").to(BookService);

export default container;
