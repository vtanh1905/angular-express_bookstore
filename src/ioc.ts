import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

// Connect Database
// import "./utils/mongoose";
import "./utils/mongoose/mongooseConnection";
import "./repositories/book.reponsitory";

// when a module is loaded @provide() will automatically register(or binding) it 
// and use buildProviderModule to active this feature 
import "./controllers";
import "./services";



// set up container
let container = new Container();

container.load(buildProviderModule());

// Manual Binding
// container.bind<UserService>("UserService").to(UserService);
// container.bind<BookService>("BookService").to(BookService);

export default container;
