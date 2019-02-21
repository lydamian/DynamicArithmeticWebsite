

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.PreparedStatement;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.google.gson.JsonObject;

/**
 * Servlet implementation class CreateAccountServlet
 */
@WebServlet("/CreateAccountServlet")
public class CreateAccountServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@Resource(name = "jdbc/MathDB")
	private DataSource dataSource;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateAccountServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("doGet/doPost at CreateAccountServlet called...\n");
		// local variables
		Connection conn = null;
		CallableStatement cStmt = null;
		Boolean outputValue = false;
	
		// getting form values
		String email = request.getParameter("newEmail");
		String password = request.getParameter("newPassword");
		String firstname = request.getParameter("firstName");
		String lastname = request.getParameter("lastName");
		
		// building test reponse
		
		/*
		PrintWriter writer = response.getWriter();
		String htmlRespone = "<html>";
		htmlRespone += "<h2>Your username is: " + email + "</h2>";
		htmlRespone += "<h2>Your password is: " + password + "</h2>";
		htmlRespone += "<h2>Your firstname is: " + firstname + "</h2>";
		htmlRespone += "<h2>Your lastname is: " + lastname + "</h2>";
		htmlRespone += "</html>";
		
		// test responses
		writer.println(htmlRespone);
		*/
		
		try {
			JsonObject responseJsonObject = new JsonObject();
			conn = dataSource.getConnection();
			cStmt = conn.prepareCall("{? = call InsertUser(?,?,?,?)}");
			cStmt.registerOutParameter(1,java.sql.Types.BOOLEAN);
			cStmt.setString(2, firstname);
			cStmt.setString(3, lastname);
			cStmt.setString(4, email);
			cStmt.setString(5, password);
			cStmt.execute();
			outputValue = cStmt.getBoolean(1);
			
			if(outputValue == false) {
				System.out.println("email already exists in database, please enter another email");
	            responseJsonObject.addProperty("username", email);
	            responseJsonObject.addProperty("status", "duplicate");
	            responseJsonObject.addProperty("message", "unsuccessful");
			}
			else {
				System.out.println(email + " was successfully added to database");
	            responseJsonObject.addProperty("username", email);
	            responseJsonObject.addProperty("status", "success");
	            responseJsonObject.addProperty("message", "success");
			}
			

            //System.out.println(responseJsonObject.toString());
            response.getWriter().write(responseJsonObject.toString());
			
		}catch(SQLException e) {
			System.err.print(e);
		}
		finally {
			try {
				cStmt.close();
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		// close connections
		try {
			cStmt.close();
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
