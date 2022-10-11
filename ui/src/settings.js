import createApp, { Card } from 'connect-ui-toolkit';
import '../styles/index.css';

const connectApp = createApp({'settings-card': Card});

async function loadData() {
    const response = await fetch('/api/whoami');
    const data = await response.json();
    let element = document.getElementById('account-data');
    element.innerHTML = `${data.user.name} (${data.user.id})<br>${data.account.name} (${data.account.id})`;

    setTimeout(()=>{element.append(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit feugiat augue eget tempus. Nam fermentum ultrices pretium. Cras sit amet nunc non risus molestie ultrices at sit amet lacus. Morbi at turpis libero. Mauris quam eros, fermentum non venenatis in, luctus in odio. Donec quis elit a nibh efficitur euismod. Vestibulum in urna dolor. Mauris malesuada nisl mattis, molestie arcu ac, tempor purus. Morbi quis nibh nisl. Cras hendrerit purus leo, et rhoncus arcu dictum quis. Sed id leo at lacus cursus dignissim in non sapien. Nullam at turpis pretium, sollicitudin turpis fringilla, ornare arcu.

Praesent tincidunt, sem id consectetur sodales, augue diam consectetur sem, eget viverra est eros eget lorem. Proin tincidunt mauris nibh, et varius orci viverra quis. Quisque suscipit nec justo vitae accumsan. Vivamus finibus hendrerit ligula, vel sollicitudin diam iaculis et. Nulla arcu dui, mattis vel scelerisque at, cursus quis diam. Nulla nec justo et urna auctor malesuada. Vestibulum ullamcorper, erat sed luctus accumsan, lorem purus suscipit ligula, non ultrices felis augue eget eros. Curabitur fringilla nisi nisl.

Donec lobortis, diam at feugiat pharetra, dui arcu luctus felis, et convallis risus sapien sit amet velit. Pellentesque non ipsum vel lorem porttitor faucibus eget a elit. Proin at lobortis neque. Pellentesque scelerisque arcu sit amet nunc feugiat hendrerit. Fusce vehicula pellentesque neque, vitae aliquam elit aliquet ut. Nullam facilisis interdum erat, in semper felis. Etiam rhoncus, massa sed interdum eleifend, dolor magna rhoncus erat, at ullamcorper ipsum justo sed risus.

Vestibulum et facilisis velit. Integer mattis vitae dolor eu sollicitudin. Duis nec ipsum enim. Quisque eget laoreet neque. Integer eu tortor id ipsum ultricies rutrum sed at felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi purus metus, commodo et dapibus aliquam, pretium ac lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec blandit purus id nisi laoreet tristique.

Donec dictum libero vel auctor faucibus. Nulla vulputate sem id egestas tempor. Donec sollicitudin sem id ex consequat maximus. Nunc ut quam sed nunc posuere imperdiet sit amet vel ipsum. Aliquam vitae purus nec dolor ornare eleifend non ac mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas finibus erat felis, ut iaculis mi imperdiet vel. Donec sit amet tellus sed magna ullamcorper ultricies. Morbi lorem nulla, lobortis quis urna et, semper feugiat augue. Cras volutpat eros et hendrerit molestie. Aenean blandit venenatis urna, nec venenatis orci feugiat eu. Nullam blandit ante id lorem faucibus pellentesque. Cras eget purus vel lacus interdum sollicitudin. Aenean ultricies sem non sapien scelerisque, non rhoncus lectus congue. Etiam gravida nec purus sed posuere. Morbi eu tellus in metus faucibus sodales vitae a lacus.`)}, 7000);
}

async function main() {
    const localApp = document.getElementById('app');
    localApp.innerHTML ='<h1>Account data</h1><settings-card id="account-data"></settings-card>';

    //load account data
    await loadData();

   
}


main();