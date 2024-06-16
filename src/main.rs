mod command;
mod errors;
mod file;
mod schema;
mod services;

use clap::Parser;
use command::run_main;
use errors::Result;

#[derive(Parser)]
#[command(name = clap::crate_name!())]
#[command(
    about = clap::crate_description!(),
    long_about = None
)]
#[command(version = "0.1.0", author = clap::crate_authors!("\n"))]
struct Cli {}

fn main() -> Result<()> {
    // Set a no-op Ctrl-C handler so that Ctrl-C results in
    // `Esc` behavior because of a `term.read_key()` error
    // instead of terminating the process. You can skip
    // this step if you have your own Ctrl-C handler already set up.
    //
    // We cannot (easily) handle this at the library level due to
    // https://github.com/Detegr/rust-ctrlc/issues/106#issuecomment-1887793468.
    ctrlc::set_handler(move || {}).expect("setting Ctrl-C handler");

    let _cli = Cli::parse();

    run_main()
}
